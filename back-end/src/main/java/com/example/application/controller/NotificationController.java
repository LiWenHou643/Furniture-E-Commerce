package com.example.application.controller;

import com.example.application.dto.OtpRequest;
import com.example.application.service.EmailService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NotificationController {
    private final EmailService emailService;

    @PostMapping("/test-kafka")
    public void test(@RequestBody OtpRequest otpRequest){
        emailService.sendToKafka(otpRequest);
    }
}
