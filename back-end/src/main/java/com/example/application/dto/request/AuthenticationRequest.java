package com.example.application.dto.request;

public record AuthenticationRequest(String username, String password, boolean persistent) {
}