package com.example.application.dto;

import com.example.application.dto.response.TokenType;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Value
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class AuthDTO {
    String accessToken;
    int accessTokenExpiry;
    TokenType tokenType;
    String username;
    String email;
    String role;
}