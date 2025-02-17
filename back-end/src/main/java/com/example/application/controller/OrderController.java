package com.example.application.controller;

import java.net.URI;
import java.text.ParseException;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.application.constants.NotificationChannel;
import com.example.application.constants.OrderStatus;
import com.example.application.constants.PaymentMethod;
import com.example.application.dto.ApiResponse;
import com.example.application.dto.NotificationDTO;
import com.example.application.dto.OrderDTO;
import com.example.application.producer.MessageProducer;
import com.example.application.service.OrderService;
import com.paypal.base.rest.PayPalRESTException;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/orders")
public class OrderController {

	OrderService orderService;
	MessageProducer messageProducer;

	@GetMapping("")
	public ResponseEntity<?> getOrdersByUserId(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "pending") String status) {
		var userId = getUserId();
		var orders = orderService.getOrdersByUserId(userId, status, page, size);
		return ResponseEntity.ok(
				ApiResponse.builder().status("success").message("Orders retrieved successfully").data(orders).build());
	}

	@GetMapping("/{orderId}")
	public ResponseEntity<?> getOrderById(@PathVariable Long orderId) {
		var userId = getUserId();
		var order = orderService.getOrderById(userId, orderId);
		return ResponseEntity.ok(
				ApiResponse.builder().status("success").message("Order retrieved successfully").data(order).build());
	}

	@PostMapping("")
	public ResponseEntity<?> processPayment(@RequestBody OrderDTO orderDTO) throws PayPalRESTException {
		var userId = getUserId();
		var paymentMethod = orderDTO.getPaymentMethod();

		// Step 1: Create the order in the database
		var savedOrder = orderService.createOrder(userId, orderDTO);

		// Step 2: If payment method is PayPal, generate the PayPal payment URL
		var successUrl = "http://localhost:8080/orders/%d/paypal/success".formatted(savedOrder.getOrderId());
		var cancelUrl = "http://localhost:8080/orders/%d/paypal/cancel".formatted(savedOrder.getOrderId());

		// Step 3: Send the PayPal payment URL
		if (paymentMethod.equals(PaymentMethod.paypal)) {
			String paypalUrl = orderService.processPayment(savedOrder.getOrderId(), successUrl, cancelUrl);
			return ResponseEntity.ok(ApiResponse.builder().status("success")
					.message("PayPal payment URL generated successfully").data(Map.of("paypalUrl", paypalUrl)).build());
		} else if (paymentMethod.equals(PaymentMethod.cod)) {
			// Push notification of new order to Shop owner
			messageProducer.sendMessage(
					NotificationDTO.builder().channel(NotificationChannel.IN_APP).userId(1L).title("New order received")
							.message("New order received with order ID: %d".formatted(savedOrder.getOrderId()))
							.readStatus(false).actionUrl("/orders/%d".formatted(savedOrder.getOrderId())).build());

			// For COD, just confirm the order
			return ResponseEntity.ok(ApiResponse.builder().status("success").message("Order placed successfully")
					.data(savedOrder).build());
		} else {
			throw new RuntimeException("Invalid payment method");
		}
	}

	@GetMapping("/{orderId}/paypal/success")
	public ResponseEntity<?> executePayPalPayment(@PathVariable Long orderId, @RequestParam String paymentId,
			@RequestParam("PayerID") String payerId) throws PayPalRESTException, ParseException {
		// Step 4: Execute the PayPal payment
		orderService.executePayPalPayment(orderId, paymentId, payerId);

		// Push notification of new order to Shop owner
		messageProducer
				.sendMessage(NotificationDTO.builder().channel(NotificationChannel.IN_APP).title("New order received")
						.userId(1L).readStatus(false).message("New order received with order ID: %d".formatted(orderId))
						.actionUrl("/orders/%d".formatted(orderId)).build());

		return ResponseEntity.status(HttpStatus.FOUND)
				.location(URI.create("http" + "://localhost:3000/orders/%d".formatted(orderId))).build();
	}

	@GetMapping("/{orderId}/paypal/cancel")
	public ResponseEntity<?> cancelPayPalPayment(@PathVariable Long orderId) {
		orderService.deleteOrder(orderId);
		return ResponseEntity.status(HttpStatus.FOUND)
				.location(URI.create("http" + "://localhost:3000/orders/%d/cancel".formatted(orderId))).build();
	}

	@PutMapping("/{orderId}/cancel")
	public ResponseEntity<?> cancelOrder(@PathVariable Long orderId) {
		var userId = getUserId();
		var order = orderService.cancelOrder(userId, orderId);
		return ResponseEntity.ok(
				ApiResponse.builder().status("success").message("Order cancelled successfully").data(order).build());
	}

	@GetMapping("/management")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> getAllOrders(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "pending") String status) {
		// If userId is null, get all orders of all users for admin
		var orders = orderService.getOrdersByUserId(null, status, page, size);
		return ResponseEntity.ok(
				ApiResponse.builder().status("success").message("Orders retrieved successfully").data(orders).build());
	}

	@PutMapping("/management")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> confirmOrder(@RequestBody Long orderId) {
		orderService.updateOrderStatus(orderId, OrderStatus.processing);
		return ResponseEntity
				.ok(ApiResponse.builder().status("success").message("Orders updated successfully").build());
	}

	private Long getUserId() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		return (Long) (authentication).getDetails();
	}

}
