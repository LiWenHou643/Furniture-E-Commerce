package com.example.application.service;

import com.example.application.config.TwilioConfig;
import com.example.application.dto.OtpDTO;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import jakarta.annotation.PostConstruct;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class PhoneService {
    RedisTemplate<String, String> redisTemplate;
    TwilioConfig twilioConfig;


    @PostConstruct
    public void initTwilio() {
        // Initialize Twilio with the credentials from the TwilioConfig
        Twilio.init(twilioConfig.getAccountSid(), twilioConfig.getAuthToken());
        log.info("Twilio initialized successfully!");
    }

    // Generate OTP
    public String generateOtp(String phoneNumber) {
        String otp = String.valueOf(new Random().nextInt(900000) + 100000); // Generate a 6-digit OTP
        // Store OTP in Redis with a 5-minute expiration
        redisTemplate.opsForValue().set(phoneNumber, otp, 5, TimeUnit.MINUTES);
        return otp;
    }

    // Send OTP to phone
    public void sendOtpPwdReset(OtpDTO otpDTO) {
        PhoneNumber to = new PhoneNumber(otpDTO.getPhoneNumber());
        PhoneNumber from = new PhoneNumber(twilioConfig.getTrialNumber());
        String otp = generateOtp(otpDTO.getPhoneNumber());
        String message = "Dear Customer, Your OTP is : " + otp + ". Please do not share it with anyone.";
        Message.creator(to, from, message).create();
        log.info("OTP sent successfully to " + otpDTO.getPhoneNumber());
    }

    // Verify OTP
    public boolean verifyOtp(String phoneNumber, String otp) {
        String storedOtp = redisTemplate.opsForValue().get(phoneNumber);
        if (otp.equals(storedOtp)) {
            deleteOtp(phoneNumber);
        }
        return otp.equals(storedOtp);
    }

    // Delete OTP after successful verification
    public void deleteOtp(String phoneNumber) {
        redisTemplate.delete(phoneNumber);
    }
}
