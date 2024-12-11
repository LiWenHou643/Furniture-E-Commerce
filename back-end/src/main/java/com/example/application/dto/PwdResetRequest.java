package com.example.application.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PwdResetRequest {
    private String phoneNumber;
    private String username;
    private String oneTimePassword;
}
