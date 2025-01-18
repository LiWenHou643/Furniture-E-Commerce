package com.example.application.controller;

import com.example.application.constants.PaymentMethod;
import com.example.application.dto.ApiResponse;
import com.example.application.dto.OrderDTO;
import com.example.application.service.OrderService;
import com.paypal.base.rest.PayPalRESTException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.text.ParseException;
import java.util.Map;


@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/orders")
public class OrderController {

    OrderService orderService;

    @GetMapping("")
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

    @GetMapping("/{orderId}")
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

    @PostMapping("")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ApiResponse<?>> processPayment(@RequestBody OrderDTO orderDTO) throws PayPalRESTException {
        var userId = getUserId();
        var paymentMethod = orderDTO.getPaymentMethod();
        // Step 1: Create the order in the database
        var savedOrder = orderService.createOrder(userId, orderDTO);

        // Step 2: If payment method is PayPal, generate the PayPal payment URL
        var successUrl = "http://localhost:8080/orders/%d/paypal/success".formatted(savedOrder.getOrderId());
        var cancelUrl = "http://localhost:8080/orders/%d/cancel".formatted(savedOrder.getOrderId());

        if (paymentMethod.equals(PaymentMethod.paypal)) {
            String paypalUrl = orderService.processPayment(savedOrder.getOrderId(), successUrl, cancelUrl);
            return ResponseEntity.ok(
                    ApiResponse.builder()
                               .status("success")
                               .message("PayPal payment URL generated successfully")
                               .data(Map.of("paypalUrl", paypalUrl))
                               .build()
            );
        } else if (paymentMethod.equals(PaymentMethod.cod)) {
            // For COD, just confirm the order
            return ResponseEntity.ok(
                    ApiResponse.builder()
                               .status("success")
                               .message("Order placed successfully")
                               .data(savedOrder)
                               .build()
            );
        } else {
            throw new RuntimeException("Invalid payment method");
        }
    }

    @GetMapping("/{orderId}/paypal/success")
    public ResponseEntity<ApiResponse<?>> executePayPalPayment(@PathVariable Long orderId, @RequestParam String paymentId, @RequestParam("PayerID") String payerId) throws PayPalRESTException, ParseException {
        orderService.executePayPalPayment(orderId, paymentId, payerId);
        return ResponseEntity.status(HttpStatus.FOUND).location(
                URI.create("http" + "://localhost:3000/orders/%d".formatted(orderId))
        ).build();
    }

    @GetMapping("/{orderId}/paypal/cancel")
    public ResponseEntity<ApiResponse<?>> cancelPayPalPayment(@PathVariable Long orderId) {
        orderService.deleteOrder(orderId);
        return ResponseEntity.status(HttpStatus.FOUND).location(
                URI.create("http" + "://localhost:3000/orders/%d/cancel".formatted(orderId))
        ).build();
    }

    @GetMapping("/{orderId}/cancel")
    public ResponseEntity<ApiResponse<?>> cancelOrder(@PathVariable Long orderId) {
        var userId = getUserId();
        var order = orderService.cancelOrder(userId, orderId);
        return ResponseEntity.ok(
                ApiResponse.builder()
                           .status("success")
                           .message("Order cancelled successfully")
                           .data(order)
                           .build()
        );
    }


    private Long getUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (Long) (authentication).getDetails();
    }

}
