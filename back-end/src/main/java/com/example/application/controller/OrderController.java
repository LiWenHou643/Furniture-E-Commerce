package com.example.application.controller;

import com.example.application.dto.ApiResponse;
import com.example.application.service.OrderService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderController {

    OrderService orderService;

    @GetMapping("/orders")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ApiResponse<?>> getOrders() {
        var userId = getUserId();
        var orders = orderService.getOrdersByUserId(userId);
        return ResponseEntity.ok(
                ApiResponse.builder()
                           .status("success")
                           .message("Orders retrieved successfully")
                           .data(orders)
                           .build()
        );
    }

    @GetMapping("/orders/{orderId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ApiResponse<?>> getOrderById(@PathVariable Long orderId) {
        var userId = getUserId();
        var order = orderService.getOrderById(userId, orderId);
        return ResponseEntity.ok(
                ApiResponse.builder()
                           .status("success")
                           .message("Order retrieved successfully")
                           .data(order)
                           .build()
        );
    }

    private Long getUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (Long) (authentication).getDetails();
    }

}
