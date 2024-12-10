package com.example.application.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class OtpService {
    RedisTemplate<String, String> redisTemplate;

    // Generate OTP
    public String generateOtp(String phoneNumber) {
        String otp = String.valueOf(new Random().nextInt(900000) + 100000); // Generate a 6-digit OTP
        // Store OTP in Redis with a 5-minute expiration
        redisTemplate.opsForValue().set(phoneNumber, otp, 5, TimeUnit.MINUTES);
        return otp;
    }

    // Verify OTP
    public boolean verifyOtp(String phoneNumber, String otp) {
        String storedOtp = redisTemplate.opsForValue().get(phoneNumber);
        return otp.equals(storedOtp);
    }

    // Delete OTP after successful verification
    public void deleteOtp(String phoneNumber) {
        redisTemplate.delete(phoneNumber);
    }
}
