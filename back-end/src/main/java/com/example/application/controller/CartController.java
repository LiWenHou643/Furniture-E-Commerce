package com.example.application.controller;

import com.example.application.dto.ApiResponse;
import com.example.application.dto.CartDTO;
import com.example.application.service.CartService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CartController {
    CartService cartService;

    @GetMapping("/carts/{id}")
    public ResponseEntity<ApiResponse<CartDTO>> getCartById(@PathVariable Long id, Authentication authentication){
        var x = authentication.getName();
        var y = authentication.getPrincipal();
        var z = authentication.getAuthorities();
        var a = authentication.getCredentials();
        return ResponseEntity.ok(
                ApiResponse.<CartDTO>builder()
                        .status("success")
                        .message("Cart fetched")
                        .data(cartService.getCartById(id))
                             .build()
        );
    }
}
