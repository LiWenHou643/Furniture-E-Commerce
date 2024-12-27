package com.example.application.config.Jwt;

import com.example.application.config.RSAKeyRecord;
import com.example.application.entity.User;
import com.example.application.repository.InvalidatedTokenRepository;
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

    public String generateAccessToken(User user) {
        JwtClaimsSet claims = JwtClaimsSet.builder()
                                          .issuer("luxehouse")
                                          .issuedAt(Instant.now())
                                          .expiresAt(Instant.now().plus(100000, ChronoUnit.SECONDS))
                                          .subject(user.getEmail()) // Subject is typically used for the email or username
                                          .claim("scope", "ROLE_" + user.getRole().getRoleName().toUpperCase()) // Add role information
                                          .claim("userId", user.getUserId()) // Add userId as a custom claim
                                          .build();

        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

    public String generateRefreshToken(User user) {
        JwtClaimsSet claims = JwtClaimsSet.builder()
                                          .issuer("luxehouse")
                                          .issuedAt(Instant.now())
                                          .expiresAt(Instant.now().plus(1, ChronoUnit.DAYS))
                                          .subject(user.getEmail())
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

