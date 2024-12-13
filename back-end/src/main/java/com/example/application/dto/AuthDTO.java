package com.example.application.dto;

import com.example.application.constants.TokenType;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class AuthDTO {
    String accessToken;
    int accessTokenExpiry;
    TokenType tokenType;
    String email;
    String phoneNumber;
    String role;
}