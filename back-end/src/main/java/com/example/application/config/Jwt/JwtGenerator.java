package com.example.application.config.Jwt;

import com.example.application.entity.Users;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
@Slf4j
public class JwtGenerator {
    private final JwtEncoder jwtEncoder;

    public String generateAccessToken(Users user) {
        JwtClaimsSet claims = JwtClaimsSet.builder()
                                          .issuer("application")
                                          .issuedAt(Instant.now())
                                          .expiresAt(Instant.now().plus(100000, ChronoUnit.SECONDS))
                                          .subject(user.getEmail())
                                          .claim("scope", user.getRole().getRoleName())
                                          .build();
        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

    public String generateRefreshToken(Users user) {
        JwtClaimsSet claims = JwtClaimsSet.builder()
                                          .issuer("application")
                                          .issuedAt(Instant.now())
                                          .expiresAt(Instant.now().plus(15, ChronoUnit.DAYS))
                                          .subject(user.getEmail())
                                          .claim("scope", "REFRESH_TOKEN")
                                          .build();
        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

}