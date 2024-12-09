package com.example.application.dto;

import lombok.Getter;

@Getter
public class LoginRequest {
    String username;
    String password;
    int persistent;
}