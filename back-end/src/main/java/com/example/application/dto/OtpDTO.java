package com.example.application.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OtpDTO {
    private String phoneNumber;
    private String email;
    private String username;
    private String otp;
}
