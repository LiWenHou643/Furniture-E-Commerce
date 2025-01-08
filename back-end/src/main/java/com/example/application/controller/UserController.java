package com.example.application.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.application.dto.AddressDTO;
import com.example.application.dto.ApiResponse;
import com.example.application.dto.UserDTO;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {

    UserService userService;
    Cloudinary cloudinary;

    @GetMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<UserDTO>>> getAllUsers() {
        return ResponseEntity.ok(
                new ApiResponse<>("success", "List of users found successfully", userService.getAllUsers()));
    }

    @GetMapping("/profile")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ApiResponse<UserDTO>> getUserById() {
        var userId = getUserId();
        return ResponseEntity.ok(
                new ApiResponse<>("success", "User found successfully", userService.getUserById(userId)));
    }

    @PostMapping("/address")
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<ApiResponse<UserDTO>> updateAddress(@RequestBody AddressDTO request) {
        var userId = getUserId();
        return ResponseEntity.ok(new ApiResponse<>("success", "Address updated successfully",
                userService.updateAddress(userId, request)));
    }

    @DeleteMapping("/address/{addressId}")
    public ResponseEntity<ApiResponse<UserDTO>> deleteAddress(@PathVariable Long addressId) {
        var userId = getUserId();
        return ResponseEntity.ok(new ApiResponse<>("success", "Address deleted successfully",
                userService.deleteAddress(userId, addressId)));
    }

    @PutMapping("/profile")
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<ApiResponse<UserDTO>> updateProfile(@RequestBody UserDTO request) {
        var userId = getUserId();
        return ResponseEntity.ok(
                new ApiResponse<>("success", "User updated successfully", userService.updateUser(userId, request)));
    }

    @PutMapping("/password")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ApiResponse<UserDTO>> updatePassword(@RequestBody @Valid UserDTO request) {
        return ResponseEntity.ok(
                new ApiResponse<>("success", "Password updated successfully", userService.updatePassword(request)));
    }

    private Long getUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (Long) (authentication).getDetails();
    }

    @PostMapping("/avatar")
    public ResponseEntity<ApiResponse<?>> uploadAvatar(@RequestParam("file") MultipartFile file) {
        try {
            Long userId = getUserId(); // Get authenticated user ID
            // Upload file to Cloudinary
            var uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                    "folder", "Avatar/" + userId // Save under user's folder
            ));
            String url = (String) uploadResult.get("secure_url"); // Get the image URL

            // Save the URL to your database associated with the userId
            UserDTO userDTO = userService.updateAvatar(userId, url);

            return ResponseEntity.ok(
                    ApiResponse.builder()
                               .message("Image uploaded successfully")
                               .status("success")
                               .data(Map.of("url", url))
                               .build()
            );
        } catch (IOException e) {
            return ResponseEntity.status(500)
                                 .body(ApiResponse.builder().message("Failed to upload image").status("error").build());
        }
    }
}
