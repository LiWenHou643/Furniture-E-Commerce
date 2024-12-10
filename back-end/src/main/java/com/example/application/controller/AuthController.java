package com.example.application.controller;

import com.example.application.config.TwilioConfig;
import com.example.application.dto.ApiResponse;
import com.example.application.dto.AuthDTO;
import com.example.application.dto.LoginRequest;
import com.example.application.service.AuthService;
import com.example.application.service.LogoutHandlerService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@RequestMapping("/api/auth")
public class AuthController {
    AuthService authService;
    LogoutHandlerService logoutHandlerService;
    TwilioConfig twilioConfig;
    private static final Map<String, String> otpStorage = new ConcurrentHashMap<>();

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthDTO>> login(@RequestBody LoginRequest loginRequest, HttpServletResponse httpServletResponse) {
        var response = authService.authenticate(loginRequest, httpServletResponse);
        log.info("User authenticated successfully");
        return ResponseEntity.ok(
                new ApiResponse<>("success", "User authenticated successfully", response));
    }
}