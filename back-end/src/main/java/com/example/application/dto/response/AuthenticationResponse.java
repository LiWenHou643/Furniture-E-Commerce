package com.example.application.dto.response;

import lombok.*;

@Builder
public record AuthenticationResponse(String accessToken, int accessTokenExpiry, TokenType tokenType,
                                     String username,
                                     String role) {
}