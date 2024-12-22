package com.example.application.service;

import com.example.application.config.RSAKeyRecord;
import com.example.application.entity.InvalidatedToken;
import com.example.application.repository.InvalidatedTokenRepository;
import com.example.application.repository.RefreshTokenRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.BadJwtException;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Objects;

@Service
@Slf4j
@RequiredArgsConstructor
public class LogoutHandlerService implements LogoutHandler {

    private final RefreshTokenRepository refreshTokenRepository;
    private final InvalidatedTokenRepository invalidatedTokenRepository;
    private final RSAKeyRecord rsaKeyRecord;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        String authenticateHeader = request.getHeader("Authorization");
        if (authenticateHeader != null) {
            authenticateHeader = authenticateHeader.replace("Bearer ", "");
            JwtDecoder jwtDecoder = NimbusJwtDecoder.withPublicKey(rsaKeyRecord.rsaPublicKey()).build();
            Jwt jwt = jwtDecoder.decode(authenticateHeader);
            InvalidatedToken invalidatedToken = new InvalidatedToken();
            invalidatedToken.setToken(authenticateHeader);
            Date expiration = Date.from(Objects.requireNonNull(jwt.getExpiresAt()));
            invalidatedToken.setExpiration(expiration);
            invalidatedTokenRepository.save(invalidatedToken);
        }

        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("refresh_token")) {
                    refreshTokenRepository.findByRefreshToken(cookie.getValue())
                                          .map(token -> {
                                              token.setRevoked(true);
                                              refreshTokenRepository.save(token);
                                              return token;
                                          })
                                          .orElseThrow(() -> new BadJwtException("Invalid refresh token"));
                }
            }
        }

        Cookie refreshTokenCookie = new Cookie("refresh_token", null);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setMaxAge(0);
        response.addCookie(refreshTokenCookie);

        SecurityContextHolder.clearContext();
    }
}