package com.example.application.config;

import com.example.application.entity.User;
import com.example.application.repository.InvalidatedTokenRepository;
import com.example.application.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Objects;

@Component
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class JwtUtils {
    InvalidatedTokenRepository invalidatedTokenRepository;
    RSAKeyRecord rsaKeyRecord;
    JwtEncoder jwtEncoder;
    private final RefreshTokenRepository refreshTokenRepository;

    public String generateAccessToken(User user) {
        String subject = (user.getRole().getRoleName().equals("admin")) ? user.getUsername() : user.getEmail();

        JwtClaimsSet claims = JwtClaimsSet.builder()
                                          .issuer("luxehouse")
                                          .issuedAt(Instant.now())
                                          .expiresAt(Instant.now().plus(100000, ChronoUnit.SECONDS))
                                          .subject(subject)
                                          .claim("scope", user.getRole().getRoleName())
                                          .build();
        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

    public String generateRefreshToken(User user) {
        String subject = (user.getRole().getRoleName().equals("admin")) ? user.getUsername() : user.getEmail();

        JwtClaimsSet claims = JwtClaimsSet.builder()
                                          .issuer("luxehouse")
                                          .issuedAt(Instant.now())
                                          .expiresAt(Instant.now().plus(1, ChronoUnit.DAYS))
                                          .subject(subject)
                                          .claim("scope", "REFRESH_TOKEN")
                                          .build();
        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

    public Jwt decode(String token) {
        JwtDecoder jwtDecoder = NimbusJwtDecoder.withPublicKey(rsaKeyRecord.rsaPublicKey()).build();

        return jwtDecoder.decode(token);
    }

    public boolean isExpired(Jwt jwtToken) {
        return Objects.requireNonNull(jwtToken.getExpiresAt()).isBefore(Instant.now());
    }

    public int getDuration(Jwt jwtToken) {
        Instant now = Instant.now();
        return (int) Objects.requireNonNull(jwtToken.getExpiresAt()).getEpochSecond() - (int) now.getEpochSecond();
    }

    public boolean isInvalidated(Jwt jwtToken) {
        return invalidatedTokenRepository.existsByToken(jwtToken.getTokenValue());
    }
}

