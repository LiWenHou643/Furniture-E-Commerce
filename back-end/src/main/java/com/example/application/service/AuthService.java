package com.example.application.service;

import com.example.application.config.Authentication.JwtGenerator;
import com.example.application.config.Authentication.JwtUtils;
import com.example.application.constants.AppConstants;
import com.example.application.constants.TokenType;
import com.example.application.dto.AuthDTO;
import com.example.application.dto.CustomerDTO;
import com.example.application.dto.LoginRequest;
import com.example.application.dto.RegisterRequest;
import com.example.application.entity.Customer;
import com.example.application.entity.RefreshToken;
import com.example.application.entity.Roles;
import com.example.application.entity.Users;
import com.example.application.exception.ResourceNotFoundException;
import com.example.application.exception.UserAlreadyExistsException;
import com.example.application.mapper.CustomerMapper;
import com.example.application.repository.CustomerRepository;
import com.example.application.repository.RefreshTokenRepository;
import com.example.application.repository.RolesRepository;
import com.example.application.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Optional;


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

    public AuthDTO authenticate(LoginRequest request, HttpServletResponse response) {
        Users user = userRepository
                .findByUsername(request.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", request.getUsername()));

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
                      .tokenType(TokenType.Bearer).username(user.getUsername())
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

    public CustomerDTO register(RegisterRequest request) {
        Optional<Roles> role = rolesRepository.findByRoleName(AppConstants.ROLE_USER);
        if (role.isEmpty()) throw new ResourceNotFoundException("Role", "roleName", AppConstants.ROLE_USER);

        request.setUsername(request.getUsername().trim());
        request.setFirstName(request.getFirstName().trim());
        request.setLastName(request.getLastName().trim());
        request.setEmail(request.getEmail().trim());
        request.setPassword(request.getPassword().trim());

//        Optional<Users> existedUser = userRepository.findByEmail(request.getEmail());
//        if (existedUser.isPresent()) throw new UserAlreadyExistsException(request.getEmail());
        Boolean existedUser = userRepository.existsByEmail(request.getEmail());
        if (existedUser) throw new UserAlreadyExistsException(request.getEmail());
        Users user = Users.builder()
                          .username(request.getUsername())
                          .email(request.getEmail())
                          .phoneNumber(request.getPhoneNumber())
                          .password(passwordEncoder.encode(request.getPassword()))
                          .role(role.get())
                          .build();
        Customer customer = Customer.builder().firstName(request.getFirstName()).lastName(request.getLastName()).user(user).build();
        Customer isSaved = customerRepository.save(customer);

//        Cart cart = Cart.builder().user(isSaved).build();
//        cartRepository.save(cart);

        return CustomerMapper.INSTANCE.toDTO(isSaved);
    }

//    public AuthenticationResponse refreshToken(HttpServletRequest request) {
//        String refreshToken = getRefreshToken(request);
//
//        RefreshToken token = refreshTokenRepository.findByRefreshToken(refreshToken)
//                                                   .orElseThrow(() -> new AppException(
//                                                           ErrorCode.REFRESH_TOKEN_INVALID));
//        if (token.isRevoked()) {
//            throw new AppException(ErrorCode.REFRESH_TOKEN_REVOKED);
//        }
//
//        Person person = token.getPerson();
//        String newAccessToken = jwtGenerator.generateAccessToken(person);
//
//        return AuthenticationResponse.builder().accessToken(newAccessToken).accessTokenExpiry(5 * 60)
//                                     .tokenType(TokenType.Bearer).username(person.getEmail())
//                                     .role(person.getRoles().getName()).build();
//    }
//
//    private static String getRefreshToken(HttpServletRequest request) {
//        Cookie[] cookies = request.getCookies();
//        String refreshToken = null;
//        if (cookies != null) {
//            for (Cookie cookie : cookies) {
//                if (cookie.getName().equals("refresh_token")) {
//                    refreshToken = cookie.getValue();
//                    break;
//                }
//            }
//        }
//        if (refreshToken == null) {
//            throw new AppException(ErrorCode.REFRESH_TOKEN_INVALID);
//        }
//        refreshToken = refreshToken.replace("Bearer ", "");
//        return refreshToken;
//    }
}