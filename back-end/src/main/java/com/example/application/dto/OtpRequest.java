package com.example.application.dto;

import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class OtpRequest {
    String phoneNumber;
    String otp;
}
