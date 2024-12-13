package com.example.application.controller;

import com.example.application.dto.*;
import com.example.application.service.AuthService;
import com.example.application.service.LogoutHandlerService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@RequestMapping("/api/auth")
public class AuthController {
    AuthService authService;
    private final LogoutHandlerService logoutHandlerService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthDTO>> login(@RequestBody LoginRequest loginRequest, HttpServletResponse httpServletResponse) {
        var response = authService.authenticate(loginRequest, httpServletResponse);
        log.info("User authenticated successfully");
        return ResponseEntity.ok(
                new ApiResponse<>("success", "User authenticated successfully", response));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<CustomerDTO>> register(@RequestBody @Valid RegisterRequest request) {
        var response = authService.register(request);
        log.info("User registered successfully");
        return ResponseEntity.ok(
                new ApiResponse<>("success", "User registered successfully", response));
    }

    @GetMapping("/refresh-token")
    public ResponseEntity<ApiResponse<AuthDTO>> refreshToken(HttpServletRequest httpServletRequest) {
        var response = authService.refreshToken(httpServletRequest);
        log.info("Token refreshed successfully");
        return ResponseEntity.ok(
                new ApiResponse<>("success", "Token refreshed successfully", response));
    }

    @GetMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        logoutHandlerService.logout(request, response, authentication);
        log.info("User logged out successfully");
        return ResponseEntity.ok(
                new ApiResponse<>("success", "User logged out successfully", null));
    }
}