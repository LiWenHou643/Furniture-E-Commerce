package com.example.application.config.Authentication;

import com.example.application.config.RSAKeyRecord;
import com.example.application.repository.InvalidatedTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class JwtUtils {
    private final InvalidatedTokenRepository invalidatedTokenRepository;
    private final RSAKeyRecord rsaKeyRecord;

    public Jwt getToken(String token) {
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

