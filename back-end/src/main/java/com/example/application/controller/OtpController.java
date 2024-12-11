package com.example.application.controller;

import com.example.application.dto.ApiResponse;
import com.example.application.dto.PwdResetRequest;
import com.example.application.dto.PwdResetResponse;
import com.example.application.service.OtpService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
@RequestMapping("/api/otp")
public class OtpController {

    OtpService otpService;

    // Endpoint to send OTP
    @PostMapping("/send")
    public ResponseEntity<ApiResponse<PwdResetResponse>> sendOtp(@RequestBody PwdResetRequest pwdResetRequest) {
        var response = otpService.sendOtpPwdReset(pwdResetRequest);
        return ResponseEntity.ok(new ApiResponse<>("success", "OTP sent successfully", response));
    }

    // Endpoint to verify OTP
    @PostMapping("/verify")
    public ResponseEntity<?> verifyOtp(@RequestBody String phoneNumber, @RequestBody String otp) {
        try {
            boolean isVerified = otpService.verifyOtp(phoneNumber, otp);

            if (isVerified) {
                return ResponseEntity.ok("OTP verified successfully");
            } else {
                return ResponseEntity.status(400).body("Invalid or expired OTP");
            }
        } catch (Exception e) {
            // Handle any exceptions (e.g., Redis errors)
            return ResponseEntity.status(500).body("Error verifying OTP: " + e.getMessage());
        }
    }
}

