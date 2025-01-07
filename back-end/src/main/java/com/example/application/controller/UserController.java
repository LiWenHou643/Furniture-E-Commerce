package com.example.application.controller;

import com.example.application.dto.AddressDTO;
import com.example.application.dto.UserDTO;
import com.example.application.dto.ApiResponse;
import com.example.application.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {

    UserService userService;

    @GetMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<UserDTO>>> getAllUsers() {
        return ResponseEntity.ok(new ApiResponse<>("success", "List of users found successfully", userService.getAllUsers()));
    }

    @GetMapping("/profile")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ApiResponse<UserDTO>> getUserById() {
        var userId = getUserId();
        return ResponseEntity.ok(new ApiResponse<>("success", "User found successfully", userService.getUserById(userId)));
    }

    @PostMapping("/address")
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<ApiResponse<UserDTO>> addAddress(@RequestBody AddressDTO request) {
        return ResponseEntity.ok(new ApiResponse<>("success", "Address updated successfully", userService.updateAddress(request)));
    }

    @PutMapping("/profile")
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<ApiResponse<UserDTO>> updateProfile(@RequestBody UserDTO request) {
        var userId = getUserId();
        return ResponseEntity.ok(new ApiResponse<>("success", "User updated successfully", userService.updateUser(userId, request)));
    }

    @PutMapping("/password")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ApiResponse<UserDTO>> updatePassword(@RequestBody @Valid UserDTO request) {
        return ResponseEntity.ok(new ApiResponse<>("success", "Password updated successfully", userService.updatePassword(request)));
    }

    private Long getUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (Long) (authentication).getDetails();
    }

}
