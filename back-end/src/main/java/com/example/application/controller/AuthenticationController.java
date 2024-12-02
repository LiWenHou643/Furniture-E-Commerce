package com.example.application.controller;

import com.example.application.dto.request.AuthenticationRequest;
import com.example.application.dto.request.RegisterRequest;
import com.example.application.dto.response.ApiResponse;
import com.example.application.dto.response.AuthenticationResponse;
import com.example.application.dto.response.PersonResponse;
import com.example.application.entity.ValidationGroups.Create;
import com.example.application.entity.ValidationGroups.Login;
import com.example.application.service.auth.AuthenticationService;
import com.example.application.service.auth.LogoutHandlerService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@RequestMapping("/auth")
public class AuthenticationController {
    AuthenticationService authenticationService;
    private final LogoutHandlerService logoutHandlerService;

    @PostMapping("/login")
    public ApiResponse<AuthenticationResponse> authenticateUser(
            @Validated(Login.class) @RequestBody AuthenticationRequest authenticationRequest,
            HttpServletResponse httpServletResponse) {
        var response = authenticationService.authenticate(authenticationRequest, httpServletResponse);
        return ApiResponse.<AuthenticationResponse>builder().message("User authenticated successfully").data(response)
                          .build();
    }

    @PostMapping("/register")
    public ApiResponse<PersonResponse> registerUser(@Validated(Create.class) @RequestBody RegisterRequest request) {
        var response = authenticationService.register(request);
        return ApiResponse.<PersonResponse>builder().message("User registered successfully").data(response)
                          .build();
    }

    @GetMapping("/logout")
    public ApiResponse<Void> logoutUser(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        logoutHandlerService.logout(request, response, authentication);
        return ApiResponse.<Void>builder().message("User logout successfully").build();
    }

    @GetMapping("/refresh")
    public ApiResponse<AuthenticationResponse> refreshToken(HttpServletRequest request) {
        var response = authenticationService.refreshToken(request);
        return ApiResponse.<AuthenticationResponse>builder().message("Token refreshed successfully").data(response)
                          .build();
    }
}