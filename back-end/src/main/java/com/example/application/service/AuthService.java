package com.example.application.service;

import com.example.application.config.Jwt.JwtUtils;
import com.example.application.dto.AuthDTO;
import com.example.application.dto.CreateUserRequest;
import com.example.application.dto.NotificationDTO;
import com.example.application.dto.UserDTO;
import com.example.application.entity.Address;
import com.example.application.entity.RefreshToken;
import com.example.application.entity.Role;
import com.example.application.entity.User;
import com.example.application.exception.DataExistedException;
import com.example.application.exception.ResourceNotFoundException;
import com.example.application.mapper.UserMapper;
import com.example.application.producer.MessageProducer;
import com.example.application.repository.RefreshTokenRepository;
import com.example.application.repository.RolesRepository;
import com.example.application.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Service;

import java.util.Set;

import static com.example.application.constants.AppConstants.ROLE_USER;


@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthService {
    JwtUtils jwtUtils;
    PasswordEncoder passwordEncoder;
    UserRepository userRepository;
    RolesRepository rolesRepository;
    RefreshTokenRepository refreshTokenRepository;
    MessageProducer messageProducer;

    public AuthDTO authenticate(AuthDTO request, HttpServletResponse response) {
        User user;
        if (isPhoneNumber(request.getUsername())) {
            user = userRepository.findByPhoneNumber(request.getUsername())
                                 .orElseThrow(() -> new BadCredentialsException("Invalid username or password"));
        } else {
            user = userRepository.findByEmail(request.getUsername())
                                 .orElseThrow(() -> new BadCredentialsException("Invalid username or password"));
        }

        if (request.isAdmin()) {
            // If user is not an admin, throw an exception
            if (!user.getRole().getRoleName().equals("ADMIN")) {
                throw new BadCredentialsException("Invalid username or password");
            }
        } else {
            // If user is an admin, throw an exception
            if (user.getRole().getRoleName().equals("ADMIN")) {
                throw new BadCredentialsException("Invalid username or password");
            }
        }

        boolean authenticated = passwordEncoder.matches(request.getPassword(), user.getPassword());
        if (!authenticated) throw new BadCredentialsException("Invalid username or password");

        String token = jwtUtils.generateAccessToken(user);
        String refreshToken = jwtUtils.generateRefreshToken(user);

        saveUserRefreshToken(user, refreshToken);
        boolean persistent = request.isPersistent();
        if (persistent) createRefreshTokenCookie(response, refreshToken);

        Jwt jwt = jwtUtils.decode(token);
        int duration = jwtUtils.getDuration(jwt);

        return AuthDTO.builder().accessToken(token).accessTokenExpiry(duration).build();
    }

    private void saveUserRefreshToken(User user, String refreshToken) {
        var refreshTokenEntity = RefreshToken.builder()
                                             .user(user)
                                             .refreshToken(refreshToken)
                                             .revoked(false)
                                             .build();
        refreshTokenRepository.save(refreshTokenEntity);
    }

    private void createRefreshTokenCookie(HttpServletResponse response, String refreshToken) {
        Cookie refreshTokenCookie = new Cookie("refresh_token", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true); // Set to true for production with HTTPS
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(15 * 24 * 60 * 60); // 15 days in seconds
        // Use "Lax" for SameSite during development:
        refreshTokenCookie.setAttribute("SameSite", "Lax");
        response.addCookie(refreshTokenCookie);
    }


    @Transactional
    public UserDTO register(CreateUserRequest request) {
        Boolean existedEmail = userRepository.existsByEmail(request.getEmail());
        if (existedEmail) throw new DataExistedException("User", "email", request.getEmail());
        Boolean existedPhoneNumber = userRepository.existsByPhoneNumber(request.getPhoneNumber());
        if (existedPhoneNumber) throw new DataExistedException("User", "phone number", request.getPhoneNumber());

        Role roleUser = rolesRepository.findByRoleName(ROLE_USER)
                                       .orElseThrow(
                                               () -> new ResourceNotFoundException("Role", "role name", ROLE_USER));

        Address address = Address.builder()
                                 .streetAddress(request.getAddress().getStreetAddress())
                                 .ward(request.getAddress().getWard())
                                 .district(request.getAddress().getDistrict())
                                 .city(request.getAddress().getCity())
                                 .build();

        User user = User.builder()
                        .firstName(request.getFirstName())
                        .lastName(request.getLastName())
                        .avatar(request.getAvatar())
                        .email(request.getEmail())
                        .addresses(Set.of(address))
                        .phoneNumber(request.getPhoneNumber())
                        .password(passwordEncoder.encode(request.getPassword()))
                        .role(roleUser)
                        .build();

        address.setUser(user);
        User isSaved = userRepository.save(user);

        NotificationDTO notificationDTO = NotificationDTO.builder().channel(
                                                                 "EMAIL"
                                                         ).recipient(user.getEmail())
                                                         .subject("Welcome to LuxeHouse")
                                                         .build();

        messageProducer.sendMessage("notification-delivery", notificationDTO);

//        Cart cart = Cart.builder().user(isSaved).build();
//        cartRepository.save(cart);

        return UserMapper.INSTANCE.toDTO(isSaved);
    }

    public AuthDTO refreshToken(HttpServletRequest httpServletRequest) {
        String refreshToken = getRefreshTokenFromCookie(httpServletRequest);

        RefreshToken token = refreshTokenRepository.findByRefreshToken(refreshToken)
                                                   .orElseThrow(
                                                           () -> new ResourceNotFoundException("Refresh Token", "token",
                                                                   refreshToken));
        if (token.isRevoked()) {
            throw new JwtException("Refresh token has been revoked");
        }

        User user = token.getUser();
        String newAccessToken = jwtUtils.generateAccessToken(user);

        Jwt jwt = jwtUtils.decode(newAccessToken);
        int duration = jwtUtils.getDuration(jwt);

        return AuthDTO.builder().accessToken(newAccessToken).accessTokenExpiry(duration).build();
    }

    private static String getRefreshTokenFromCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        String refreshToken = null;
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("refresh_token")) {
                    refreshToken = cookie.getValue();
                    break;
                }
            }
        }
        if (refreshToken == null) {
            throw new JwtException("Invalid refresh token");
        }
        refreshToken = refreshToken.replace("Bearer ", "");
        return refreshToken;
    }

    private boolean isPhoneNumber(String phoneNumber) {
        return phoneNumber.matches("^\\+?[0-9]{10,11}$");
    }
}