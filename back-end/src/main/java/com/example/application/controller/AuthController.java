package com.example.application.controller;

import com.example.application.dto.AuthDTO;
import com.example.application.dto.LoginRequest;
import com.example.application.dto.response.ApiResponse;
import com.example.application.service.AuthService;
import com.example.application.service.LogoutHandlerService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@RequestMapping("/api/auth")
public class AuthController {
    AuthService authService;
    LogoutHandlerService logoutHandlerService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthDTO>> login(@RequestBody LoginRequest loginRequest, HttpServletResponse httpServletResponse) {
        var response = authService.authenticate(loginRequest, httpServletResponse);
        log.info("User authenticated successfully");
        return ResponseEntity.ok(
                new ApiResponse<>("success", "User authenticated successfully", response));
    }
//
//    @PostMapping("/register")
//    public ApiResponse<PersonResponse> registerUser(@RequestBody RegisterRequest request) {
//        var response = authenticationService.register(request);
//        return ApiResponse.<PersonResponse>builder().message("User registered successfully").data(response)
//                          .build();
//    }
//
//    @GetMapping("/logout")
//    public ApiResponse<Void> logoutUser(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
//        logoutHandlerService.logout(request, response, authentication);
//        return ApiResponse.<Void>builder().message("User logout successfully").build();
//    }
//
//    @GetMapping("/refresh")
//    public ApiResponse<AuthenticationResponse> refreshToken(HttpServletRequest request) {
//        var response = authenticationService.refreshToken(request);
//        return ApiResponse.<AuthenticationResponse>builder().message("Token refreshed successfully").data(response)
//                          .build();
//    }
}