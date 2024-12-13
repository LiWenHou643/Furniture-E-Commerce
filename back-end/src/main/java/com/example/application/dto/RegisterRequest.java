package com.example.application.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class RegisterRequest {
    @NotBlank(message = "First name is required")
    String firstName;
    @NotBlank(message = "Last name is required")
    String lastName;
    @NotBlank(message = "Phone number is required")
    String phoneNumber;
    @NotBlank(message = "Email is required")
    String email;
    @NotBlank(message = "Password is required")
    String password;
}
