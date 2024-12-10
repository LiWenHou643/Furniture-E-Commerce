package com.example.application.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class PhoneRequest {
    @NotBlank(message = "Phone number is required")
    String phoneNumber;
}
