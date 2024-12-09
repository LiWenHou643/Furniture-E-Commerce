package com.example.application.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public String getAllUsers() {
        return "Get all users";
    }

}
