package com.example.application.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthRequest {
    String username;
    String email;
    String phoneNumber;
    String password;
    boolean rememberMe;
    boolean isAdmin;
}