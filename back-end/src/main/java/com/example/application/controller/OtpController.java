package com.example.application.controller;

import com.example.application.dto.ApiResponse;
import com.example.application.dto.OtpDTO;
import com.example.application.service.EmailService;
import com.example.application.service.PhoneService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
@RequestMapping("/api/otp")
public class OtpController {

    PhoneService phoneService;
    EmailService emailService;

    // Endpoint to send OTP to phone
    @PostMapping("/send-phone")
    public ResponseEntity<ApiResponse<OtpDTO>> sendOtpToPhone(@RequestBody OtpDTO otpDTO) {
        try {
            phoneService.sendOtpPwdReset(otpDTO);
            return ResponseEntity.ok(new ApiResponse<>("success", "OTP sent successfully", null));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponse<>("error", e.getMessage(), null));
        }
    }

    // Endpoint to verify OTP
    @PostMapping("/verify")
    public ResponseEntity<?> verifyOtp(@RequestBody String phoneNumber, @RequestBody String otp) {
        try {
            boolean isVerified = phoneService.verifyOtp(phoneNumber, otp);

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

