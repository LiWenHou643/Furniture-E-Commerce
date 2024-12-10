package com.example.application.controller;

import com.example.application.service.OtpService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/otp")
public class OtpController {

    private final OtpService otpService;

    public OtpController(OtpService otpService) {
        this.otpService = otpService;
    }

    // Endpoint to send OTP
    @PostMapping("/send")
    public ResponseEntity<?> sendOtp(@RequestParam String phoneNumber) {
        try {
            // Generate OTP and store it in Redis
            String otp = otpService.generateOtp(phoneNumber);

            // Integrate with SMS API (e.g., Twilio, Zalo, etc.) to send OTP
            // For now, we will print it in the console (replace with actual API call)
            System.out.println("OTP sent to " + phoneNumber + ": " + otp);

            return ResponseEntity.ok("OTP sent successfully");
        } catch (Exception e) {
            // Handle exceptions if any (e.g., invalid phone number format, Redis issues, etc.)
            return ResponseEntity.status(500).body("Error sending OTP: " + e.getMessage());
        }
    }

    // Endpoint to verify OTP
    @PostMapping("/verify")
    public ResponseEntity<?> verifyOtp(@RequestParam String phoneNumber, @RequestParam String otp) {
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

