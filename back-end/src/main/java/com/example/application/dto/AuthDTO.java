package com.example.application.dto;

import com.example.application.dto.response.TokenType;
import lombok.*;

@Value
@Builder
public class AuthDTO {
    String accessToken;
    int accessTokenExpiry;
    TokenType tokenType;
    String username;
    String email;
    String role;
}