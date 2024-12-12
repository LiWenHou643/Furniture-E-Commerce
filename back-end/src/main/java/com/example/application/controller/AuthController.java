package com.example.application.controller;

import com.example.application.dto.*;
import com.example.application.service.AuthService;
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

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@RequestMapping("/api/auth")
public class AuthController {
    AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthDTO>> login(@RequestBody LoginRequest loginRequest, HttpServletResponse httpServletResponse) {
        var response = authService.authenticate(loginRequest, httpServletResponse);
        log.info("User authenticated successfully");
        return ResponseEntity.ok(
                new ApiResponse<>("success", "User authenticated successfully", response));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<CustomerDTO>> register(@RequestBody RegisterRequest request) {
        var response = authService.register(request);
        log.info("User registered successfully");
        return ResponseEntity.ok(
                new ApiResponse<>("success", "User registered successfully", response));
    }
}