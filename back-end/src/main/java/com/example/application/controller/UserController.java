package com.example.application.controller;

import com.example.application.dto.UserDTO;
import com.example.application.dto.response.ApiResponse;
import com.example.application.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public String getAllUsers() {
        return "Get all users";
    }

    @GetMapping("/{id}")
//    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public ResponseEntity<ApiResponse<UserDTO>> getUserById(@PathVariable Long id) {
        var user = userService.getUserById(id);
        return ResponseEntity.ok(new ApiResponse<>("success", "User found successfully", user));
    }

}
