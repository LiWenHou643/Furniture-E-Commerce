package com.example.application.config.Authentication;

import com.example.application.entity.Person;
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

    public String generateAccessToken(Person person) {
        JwtClaimsSet claims = JwtClaimsSet.builder()
                                          .issuer("eyeglass")
                                          .issuedAt(Instant.now())
                                          .expiresAt(Instant.now().plus(10, ChronoUnit.SECONDS))
                                          .subject(person.getEmail())
                                          .claim("scope", person.getRoles().getName())
                                          .build();
        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

    public String generatePaypalToken(Person person) {
        JwtClaimsSet claims = JwtClaimsSet.builder()
                                          .issuer("eyeglass")
                                          .issuedAt(Instant.now())
                                          .expiresAt(Instant.now().plus(60, ChronoUnit.SECONDS))
                                          .subject(person.getEmail())
                                          .claim("scope", person.getRoles().getName())
                                          .build();
        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

    public String generateRefreshToken(Person person) {
        JwtClaimsSet claims = JwtClaimsSet.builder()
                                          .issuer("eyeglass")
                                          .issuedAt(Instant.now())
                                          .expiresAt(Instant.now().plus(15, ChronoUnit.DAYS))
                                          .subject(person.getEmail())
                                          .claim("scope", "REFRESH_TOKEN")
                                          .build();
        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

}