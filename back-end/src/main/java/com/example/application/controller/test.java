package com.example.application.controller;

import com.example.application.dto.ApiResponse;
import com.example.application.service.CartService;
import com.example.application.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class test {

    CartService cartService;
    OrderService orderService;

    @GetMapping("auth/test")
    public ResponseEntity<ApiResponse<?>> testing() {

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .status("success")
                        .message("Test endpoint")
                        .data(cartService.getCartByUserId(2L))
                        .build()
        );
    }
}
