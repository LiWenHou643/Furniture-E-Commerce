package com.example.application.controller;

import com.example.application.dto.NotificationDTO;
import com.example.application.dto.TestEmail;
import com.example.application.producer.MessageProducer;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class TestOauth2 {
    MessageProducer messageProducer;

    public TestOauth2(MessageProducer messageProducer) {
        this.messageProducer = messageProducer;
    }

    @GetMapping("/test")
    public Map<String, Object> getUserInfo(@AuthenticationPrincipal OAuth2User principal) {
        return principal.getAttributes();
    }

    @PostMapping("/auth/email")
    public void getEmail(@RequestBody TestEmail email) {
        NotificationDTO notificationDTO = NotificationDTO.builder().channel(
                                                                 "EMAIL"
                                                         ).recipient(email.email())
                                                         .subject("Welcome to LuxeHouse")
                                                         .build();

        messageProducer.sendMessage("notification-delivery", notificationDTO);
    }
}
