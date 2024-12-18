package com.example.application.service;

import com.example.application.config.Jwt.JwtGenerator;
import com.example.application.config.Jwt.JwtUtils;
import com.example.application.constants.AppConstants;
import com.example.application.constants.TokenType;
import com.example.application.dto.AuthDTO;
import com.example.application.dto.NotificationDTO;
import com.example.application.entity.RefreshToken;
import com.example.application.entity.Roles;
import com.example.application.entity.Users;
import com.example.application.exception.DataExistedException;
import com.example.application.exception.ResourceNotFoundException;
import com.example.application.producer.MessageProducer;
import com.example.application.repository.CustomerRepository;
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


@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthService {
    JwtUtils jwtUtils;
    JwtGenerator jwtGenerator;
    PasswordEncoder passwordEncoder;
    UserRepository userRepository;
    RolesRepository rolesRepository;
    CustomerRepository customerRepository;
    RefreshTokenRepository refreshTokenRepository;
    MessageProducer messageProducer;

    public AuthDTO authenticate(AuthDTO request, HttpServletResponse response) {
        Users user = null;
        if (!(request.getEmail() == null)) {
            user = userRepository
                    .findByEmail(request.getEmail())
                    .orElseThrow(() -> new ResourceNotFoundException("User", "email", request.getEmail()));
        } else if (!(request.getPhoneNumber() == null)) {
            user = userRepository
                    .findByPhoneNumber(request.getPhoneNumber())
                    .orElseThrow(() -> new ResourceNotFoundException("User", "phone number", request.getPhoneNumber()));
        }

        assert user != null;
        boolean authenticated = passwordEncoder.matches(request.getPassword(), user.getPassword());
        if (!authenticated) throw new BadCredentialsException("Invalid username or password");

        String token = jwtGenerator.generateAccessToken(user);
        String refreshToken = jwtGenerator.generateRefreshToken(user);

        saveUserRefreshToken(user, refreshToken);
        int persistent = request.getPersistent();
        if (persistent == 1) createRefreshTokenCookie(response, refreshToken);

        Jwt jwt = jwtUtils.getToken(token);
        int duration = jwtUtils.getDuration(jwt);

        return AuthDTO.builder().accessToken(token).accessTokenExpiry(duration)
                      .tokenType(TokenType.Bearer).phoneNumber(user.getPhoneNumber())
                      .email(user.getEmail()).role(user.getRole().getRoleName()).build();
    }

    private void saveUserRefreshToken(Users user, String refreshToken) {
        var refreshTokenEntity = RefreshToken.builder()
                                             .user(user)
                                             .refreshToken(refreshToken)
                                             .revoked(0)
                                             .build();
        refreshTokenRepository.save(refreshTokenEntity);
    }

    private void createRefreshTokenCookie(HttpServletResponse response, String refreshToken) {
        Cookie refreshTokenCookie = new Cookie("refresh_token", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setMaxAge(15 * 24 * 60 * 60); // in seconds (15 days)
        response.addCookie(refreshTokenCookie);
    }

    @Transactional
    public AuthDTO register(AuthDTO request) {
        Roles role = rolesRepository.findByRoleName(AppConstants.ROLE_USER)
                                    .orElseThrow(() -> new ResourceNotFoundException(
                                            "Role", "roleName", AppConstants.ROLE_USER));

        request.setFirstName(request.getFirstName().trim());
        request.setLastName(request.getLastName().trim());
        request.setEmail(request.getEmail().trim());
        request.setPassword(request.getPassword().trim());

        Boolean existedEmail = userRepository.existsByEmail(request.getEmail());
        if (existedEmail) throw new DataExistedException("User", "email", request.getEmail());
        Boolean existedPhoneNumber = userRepository.existsByPhoneNumber(request.getPhoneNumber());
        if (existedPhoneNumber) throw new DataExistedException("User", "phone number", request.getPhoneNumber());
        Users user = Users.builder()
                          .email(request.getEmail())
                          .phoneNumber(request.getPhoneNumber())
                          .password(passwordEncoder.encode(request.getPassword()))
                          .role(role)
                          .build();
        Customer customer = Customer.builder().firstName(request.getFirstName()).lastName(request.getLastName())
                                    .user(user).build();
        Customer isSaved = customerRepository.save(customer);

        NotificationDTO notificationDTO = NotificationDTO.builder().channel(
                                                                 "EMAIL"
                                                         ).recipient(user.getEmail())
                                                         .subject("Welcome to my channel")
                                                         .body("Hello, " + customer.getFirstName() + customer.getLastName())
                                                         .build();

        messageProducer.sendMessage("notification-delivery", notificationDTO);
//        Cart cart = Cart.builder().user(isSaved).build();
//        cartRepository.save(cart);


        return AuthDTO.builder().email(user.getEmail()).phoneNumber(user.getPhoneNumber())
                      .role(user.getRole().getRoleName()).firstName(isSaved.getFirstName())
                      .lastName(isSaved.getLastName()).build();
    }

    public AuthDTO refreshToken(HttpServletRequest httpServletRequest) {
        String refreshToken = getRefreshToken(httpServletRequest);

        RefreshToken token = refreshTokenRepository.findByRefreshToken(refreshToken)
                                                   .orElseThrow(
                                                           () -> new ResourceNotFoundException("Refresh Token", "token",
                                                                   refreshToken));
        if (token.getRevoked() == 1) {
            throw new JwtException("Refresh token has been revoked");
        }

        Users user = token.getUser();
        String newAccessToken = jwtGenerator.generateAccessToken(user);

        Jwt jwt = jwtUtils.getToken(newAccessToken);
        int duration = jwtUtils.getDuration(jwt);

        return AuthDTO.builder().accessToken(newAccessToken).accessTokenExpiry(duration)
                      .tokenType(TokenType.Bearer).email(user.getEmail())
                      .role(user.getRole().getRoleName()).build();
    }

    private static String getRefreshToken(HttpServletRequest request) {
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
}