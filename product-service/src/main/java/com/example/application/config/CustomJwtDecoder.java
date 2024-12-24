package com.example.application.config;

import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Component;
import com.nimbusds.jwt.SignedJWT;
import com.nimbusds.jwt.JWTClaimsSet;
import java.text.ParseException;

@Component
public class CustomJwtDecoder implements JwtDecoder {

    @Override
    public Jwt decode(String token) {
        try {
            // Parse the JWT without verifying the signature
            SignedJWT signedJWT = SignedJWT.parse(token);

            // Extract claims and header from the JWT
            JWTClaimsSet claimsSet = signedJWT.getJWTClaimsSet();

            // Create and return a Jwt object with parsed claims and header
            return new Jwt(token,
                    claimsSet.getIssueTime().toInstant(),
                    claimsSet.getExpirationTime().toInstant(),
                    signedJWT.getHeader().toJSONObject(),
                    claimsSet.getClaims()
            );

        } catch (ParseException e) {
            throw new JwtException("Invalid token", e);
        }
    }
}
