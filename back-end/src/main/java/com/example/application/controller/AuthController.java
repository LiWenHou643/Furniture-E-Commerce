package com.example.application.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.application.dto.ApiResponse;
import com.example.application.dto.AuthDTO;
import com.example.application.dto.CreateUserRequest;
import com.example.application.dto.UserDTO;
import com.example.application.service.AuthService;
import com.example.application.service.LogoutHandlerService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@RequestMapping("/auth")
public class AuthController {
	AuthService authService;
	private final LogoutHandlerService logoutHandlerService;

	@PostMapping("/login")
	public ResponseEntity<ApiResponse<AuthDTO>> login(@RequestBody AuthDTO loginRequest,
			HttpServletResponse httpServletResponse) {
		var response = authService.authenticate(loginRequest, httpServletResponse);
		return ResponseEntity.ok(new ApiResponse<>("success", "User authenticated successfully", response));
	}

	@PostMapping("/register")
	public ResponseEntity<ApiResponse<UserDTO>> register(@RequestBody @Valid CreateUserRequest request) {
		var user = authService.register(request);
		return ResponseEntity.ok(new ApiResponse<>("success", "User registered successfully", user));
	}

	@GetMapping("/refresh-token")
	public ResponseEntity<ApiResponse<AuthDTO>> refreshToken(HttpServletRequest httpServletRequest) {
		var response = authService.refreshToken(httpServletRequest);
		log.info("Token refreshed successfully");
		return ResponseEntity.ok(new ApiResponse<>("success", "Token refreshed successfully", response));
	}

	@GetMapping("/logout")
	public ResponseEntity<ApiResponse<String>> logout(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) {
		logoutHandlerService.logout(request, response, authentication);
		log.info("User logged out successfully");
		return ResponseEntity.ok(new ApiResponse<>("success", "User logged out successfully", null));
	}

	@PostMapping("/reset-password")
	public ResponseEntity<ApiResponse<String>> resetPassword(@RequestBody AuthDTO auth) {
		authService.resetPassword(auth.getUsername());
		return ResponseEntity.ok(new ApiResponse<>("success", "Password reset successfully", null));
	}
}