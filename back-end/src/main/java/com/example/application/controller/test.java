package com.example.application.controller;

import com.example.application.dto.ApiResponse;
import com.example.application.service.CartService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class test {

    private final CartService cartService;

    @GetMapping("auth/test")
    public ResponseEntity<ApiResponse<?>> testing() {

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .status("success")
                        .message("Test endpoint")
                        .data(cartService.getCartById(2L))
                        .build()
        );
    }
}
