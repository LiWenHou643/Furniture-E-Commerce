package com.example.application.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.application.dto.AddressDTO;
import com.example.application.dto.ApiResponse;
import com.example.application.dto.UserDTO;
import com.example.application.service.UserService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {

	UserService userService;
	Cloudinary cloudinary;

	@GetMapping("")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> getAllUsers(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size) {
		return ResponseEntity.ok(ApiResponse.builder().message("Users retrieved successfully").status("success")
				.data(userService.getAllUsers(page, size)).build());
	}

	@GetMapping("/profile")
	@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
	public ResponseEntity<?> getUserById() {
		var userId = getUserId();
		return ResponseEntity
				.ok(new ApiResponse<>("success", "User found successfully", userService.getUserById(userId)));
	}

	@PostMapping("/address")
	@PreAuthorize("hasAnyRole('USER')")
	public ResponseEntity<?> updateAddress(@RequestBody AddressDTO request) {
		var userId = getUserId();
		return ResponseEntity.ok(new ApiResponse<>("success", "Address updated successfully",
				userService.updateAddress(userId, request)));
	}

	@DeleteMapping("/address/{addressId}")
	public ResponseEntity<?> deleteAddress(@PathVariable Long addressId) {
		var userId = getUserId();
		return ResponseEntity.ok(new ApiResponse<>("success", "Address deleted successfully",
				userService.deleteAddress(userId, addressId)));
	}

	@PutMapping("/{userId}/profile")
	@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
	public ResponseEntity<?> updateProfile(@PathVariable(required = false) Long userId, @RequestBody UserDTO request) {
		if (userId == null) {
			userId = getUserId();
		}
		return ResponseEntity
				.ok(new ApiResponse<>("success", "User updated successfully", userService.updateUser(userId, request)));
	}

	@PutMapping("/password")
	@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
	public ResponseEntity<?> updatePassword(@RequestBody UserDTO request) {
		var userId = getUserId();
		return ResponseEntity.ok(new ApiResponse<>("success", "Password updated successfully",
				userService.updatePassword(userId, request)));
	}

	private Long getUserId() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		return (Long) (authentication).getDetails();
	}

	@PostMapping("/avatar")
	public ResponseEntity<ApiResponse<?>> uploadAvatar(@RequestParam MultipartFile file) {
		try {
			Long userId = getUserId(); // Get authenticated user ID
			// Upload file to Cloudinary
			var uploadResult = cloudinary.uploader().upload(file.getBytes(),
					ObjectUtils.asMap("folder", "Avatar/" + userId // Save under user's folder
					));
			String url = (String) uploadResult.get("secure_url"); // Get the image URL

			// Save the URL to your database associated with the userId
			userService.updateAvatar(userId, url);

			return ResponseEntity.ok(ApiResponse.builder().message("Image uploaded successfully").status("success")
					.data(Map.of("url", url)).build());
		} catch (IOException e) {
			return ResponseEntity.status(500)
					.body(ApiResponse.builder().message("Failed to upload image").status("error").build());
		}
	}

	@PutMapping("/{userId}/status")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> changeUserStatus(@PathVariable Long userId) {
		return ResponseEntity
				.ok(new ApiResponse<>("success", "User banned successfully", userService.changeUserStatus(userId)));
	}

	@GetMapping("/user-count")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> getUserCount() {
		return ResponseEntity
				.ok(new ApiResponse<>("success", "User count retrieved successfully", userService.countUsers()));
	}

}
