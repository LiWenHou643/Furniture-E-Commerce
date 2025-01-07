package com.example.application.controller;

import com.example.application.dto.ApiResponse;
import com.example.application.dto.CartDTO;
import com.example.application.dto.CartItemDTO;
import com.example.application.service.CartService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CartController {
    CartService cartService;

    @GetMapping("/carts")
    public ResponseEntity<ApiResponse<CartDTO>> getCartById() {
        Long userId = getUserId();
        var cart = cartService.getCartById(userId);

        return ResponseEntity.ok(
                ApiResponse.<CartDTO>builder()
                           .status("success")
                           .message("Cart retrieved successfully")
                           .data(cart)
                           .build()
        );
    }

    @PostMapping("/carts/items")
    public ResponseEntity<ApiResponse<CartDTO>> addItemToCart(@RequestBody CartItemDTO cartItemDTO) {
        Long userId = getUserId();
        var cart = cartService.addItemToCart(userId, cartItemDTO);

        return ResponseEntity.ok(
                ApiResponse.<CartDTO>builder()
                           .status("success")
                           .message("Item added to cart successfully")
                           .data(cart)
                           .build()
        );
    }

    @PutMapping("/carts/items")
    public ResponseEntity<ApiResponse<CartDTO>> updateItemInCart(@RequestBody CartItemDTO cartItemDTO) {
        Long userId = getUserId();
        var cart = cartService.updateItemInCart(userId, cartItemDTO);

        return ResponseEntity.ok(
                ApiResponse.<CartDTO>builder()
                           .status("success")
                           .message("Item updated in cart successfully")
                           .data(cart)
                           .build()
        );
    }

    @DeleteMapping("/carts/items/{cartItemId}")
    public ResponseEntity<ApiResponse<CartDTO>> removeItemFromCart(@PathVariable Long cartItemId) {
        Long userId = getUserId();
        var cart = cartService.removeItemFromCart(userId, cartItemId);

        return ResponseEntity.ok(
                ApiResponse.<CartDTO>builder()
                           .status("success")
                           .message("Item removed from cart successfully")
                           .data(cart)
                           .build()
        );
    }

    private Long getUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (Long) (authentication).getDetails();
    }

}
