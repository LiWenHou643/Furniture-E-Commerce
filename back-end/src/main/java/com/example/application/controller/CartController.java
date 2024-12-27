package com.example.application.controller;

import com.example.application.dto.ApiResponse;
import com.example.application.dto.CartDTO;
import com.example.application.service.CartService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
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
        if (authentication.getPrincipal() instanceof Jwt jwt) {
            var userId = jwt.getClaim("userId");
            var cart = cartService.getCartById(id);

            if (userId == null || !userId.equals(cart.getUserId())) {
                return ResponseEntity.status(403).body(
                        ApiResponse.<CartDTO>builder()
                                .status("error")
                                .message("Unauthorized")
                                .build()
                );
            }

            return ResponseEntity.ok(
                    ApiResponse.<CartDTO>builder()
                               .status("success")
                               .message("Cart fetched")
                               .data(cartService.getCartById(id))
                               .build()
            );
        }

        return ResponseEntity.status(403).body(
                ApiResponse.<CartDTO>builder()
                        .status("error")
                        .message("Error fetching cart")
                        .build()
        );
    }
}
