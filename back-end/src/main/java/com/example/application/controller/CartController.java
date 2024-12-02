package com.example.application.controller;

import com.example.application.dto.response.ApiResponse;
import com.example.application.dto.response.CartResponse;
import com.example.application.exception.AppException;
import com.example.application.exception.ErrorCode;
import com.example.application.service.product.CartService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RestController
@RequestMapping("/user/cart")
public class CartController {
    CartService cartService;

    @GetMapping
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public ApiResponse<CartResponse> getCartItems() {
        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        var cart = cartService.getCartItems(userName);
        var message = cart == null ? "Cart is empty" : "Cart items retrieved successfully";
        return ApiResponse.<CartResponse>builder().message(message).data(cart).build();
    }

    @PostMapping(value = "/add")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public ApiResponse<Object> addItemToCart(@RequestParam(required = false, name = "cartId") Long cartId, @RequestParam(name = "productId") Long productId, @RequestParam(name = "quantity") int quantity) {
        if (cartId == null) {
            String userName = SecurityContextHolder.getContext().getAuthentication().getName();
            cartId = cartService.getCartId(userName);
        }
        String message = cartService.addItemToCart(cartId, productId, quantity);
        return ApiResponse.builder().message(message).build();
    }

    @PostMapping(value = "/update")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public ApiResponse<Object> updateItemInCart(@RequestParam(name = "cartItemId") Long cartItemId, @RequestParam(name = "quantity") int quantity) {
        cartService.updateItemInCart(cartItemId, quantity);
        return ApiResponse.builder().message("Item updated in cart").build();
    }

    @DeleteMapping(value = "/remove/{itemId}")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public ApiResponse<Object> removeItemFromCart(@PathVariable Long itemId) {
        boolean removed = cartService.removeItemFromCart(itemId);
        if (!removed) {
            throw new AppException(ErrorCode.CART_ITEM_NOT_FOUND);
        }

        return ApiResponse.builder().message("Item removed from cart").build();
    }

}
