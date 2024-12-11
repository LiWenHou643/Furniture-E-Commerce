package com.example.application.dto;

import com.example.application.constants.OtpStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OtpResponse {
    private OtpStatus status;
    private String message;
}
