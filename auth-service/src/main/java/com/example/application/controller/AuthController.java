package com.example.application.controller;

import com.example.application.dto.ApiResponse;
import com.example.application.dto.request.AuthRequest;
import com.example.application.dto.request.IntrospectRequest;
import com.example.application.dto.response.AuthResponse;
import com.example.application.dto.response.IntrospectResponse;
import com.example.application.service.AuthService;
import com.example.application.service.LogoutHandlerService;
import com.nimbusds.jose.JOSEException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthController {
    AuthService authService;
    LogoutHandlerService logoutHandlerService;

    @PostMapping("/token")
    public ApiResponse<AuthResponse> authenticate(@RequestBody AuthRequest request, HttpServletResponse response) {
        var result = authService.authenticate(request, response);
        return ApiResponse.<AuthResponse>builder().data(result).build();
    }

    @PostMapping("/introspect")
    public ApiResponse<IntrospectResponse> authenticate(@RequestBody IntrospectRequest request) {
        var result = authService.introspect(request);
        return ApiResponse.<IntrospectResponse>builder().data(result).build();
    }

    @PostMapping("/refresh")
    ApiResponse<AuthResponse> authenticate(HttpServletRequest request) {
        var result = authService.refreshToken(request);
        return ApiResponse.<AuthResponse>builder().data(result).build();
    }

    @PostMapping("/logout")
    ApiResponse<Void> logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        logoutHandlerService.logout(request, response, authentication);
        return ApiResponse.<Void>builder().build();
    }
}