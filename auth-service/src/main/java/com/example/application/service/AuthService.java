package com.example.application.service;

import com.example.application.config.JwtUtils;
import com.example.application.dto.request.AuthRequest;
import com.example.application.dto.request.IntrospectRequest;
import com.example.application.dto.response.AuthResponse;
import com.example.application.dto.response.IntrospectResponse;
import com.example.application.entity.RefreshToken;
import com.example.application.entity.User;
import com.example.application.exception.ResourceNotFoundException;
import com.example.application.repository.RefreshTokenRepository;
import com.example.application.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthService {
    UserRepository userRepository;
    RefreshTokenRepository refreshTokenRepository;
    JwtUtils jwtUtils;
    PasswordEncoder passwordEncoder;

    public IntrospectResponse introspect(IntrospectRequest request) {
        var token = request.getToken();
        boolean isValid = true;

        var jwt = jwtUtils.decode(token);
        if (jwtUtils.isExpired(jwt)) {
            isValid = false;
        }
        if (jwtUtils.isInvalidated(jwt)) {
            isValid = false;
        }

        return IntrospectResponse.builder().valid(isValid).build();
    }

    public AuthResponse authenticate(AuthRequest request, HttpServletResponse response) {
        Optional<User> user;
        if (request.isAdmin()) {
            user = userRepository.findByEmail(request.getUsername());

            if (user.isEmpty()) {
                throw new ResourceNotFoundException("Admin", "username", request.getUsername());
            }
            if (!user.get().getRole().getRoleName().equals("admin")) {
                throw new BadCredentialsException("Invalid credentials");
            }
        } else {
            if (isPhoneNumber(request.getUsername())) {
                user = userRepository.findByPhoneNumber(request.getUsername());
            } else {
                user = userRepository.findByEmail(request.getUsername());
            }

            if (user.isEmpty()) {
                throw new ResourceNotFoundException("User", "email or phone", request.getUsername());
            }
            if (!user.get().getRole().getRoleName().equals("user")) {
                throw new BadCredentialsException("Invalid credentials");
            }
        }

        boolean authenticated = passwordEncoder.matches(request.getPassword(), user.get().getPassword());

        if (!authenticated) throw new BadCredentialsException("Invalid credentials");

        var token = jwtUtils.generateAccessToken(user.get());

        if (request.isRememberMe()) {
            createRefreshTokenCookie(response, jwtUtils.generateRefreshToken(user.get()));
        }

        return AuthResponse.builder().token(token).build();
    }

    boolean isPhoneNumber(String str) {
        return str.matches("^[0-9]{10,11}$");
    }

    private void createRefreshTokenCookie(HttpServletResponse response, String refreshToken) {
        Cookie refreshTokenCookie = new Cookie("refresh_token", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setMaxAge(15 * 24 * 60 * 60); // in seconds (15 days)
        response.addCookie(refreshTokenCookie);
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

    public AuthResponse refreshToken(HttpServletRequest httpServletRequest) {
        String refreshToken = getRefreshTokenFromCookie(httpServletRequest);

        RefreshToken token = refreshTokenRepository.findByRefreshToken(refreshToken)
                                                   .orElseThrow(
                                                           () -> new ResourceNotFoundException("Refresh Token", "token",
                                                                   refreshToken));
        if (token.isRevoked()) {
            throw new JwtException("Refresh token has been revoked");
        }

        Jwt jwt = jwtUtils.decode(refreshToken);

        if (jwtUtils.isExpired(jwt)) {
            throw new JwtException("Refresh token has expired");
        }

        User user = token.getUser();
        String newRefreshToken = jwtUtils.generateRefreshToken(user);
        token.setRevoked(true);
        refreshTokenRepository.save(token);
        refreshTokenRepository.save(RefreshToken.builder().refreshToken(newRefreshToken).user(user).build());

        return AuthResponse.builder().token(newRefreshToken).build();
    }

}