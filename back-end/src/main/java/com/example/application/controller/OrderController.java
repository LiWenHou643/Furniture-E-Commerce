package com.example.application.controller;

import java.net.URI;
import java.text.ParseException;
import java.time.LocalDateTime;
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

import com.example.application.config.Kafka.KafkaTopics;
import com.example.application.constants.NotificationChannel;
import com.example.application.constants.OrderStatus;
import com.example.application.constants.PaymentMethod;
import com.example.application.dto.ApiResponse;
import com.example.application.dto.NotificationDTO;
import com.example.application.dto.OrderDTO;
import com.example.application.producer.MessageProducer;
import com.example.application.service.CartService;
import com.example.application.service.OrderService;
import com.example.application.service.UserService;
import com.paypal.base.rest.PayPalRESTException;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/orders")
@Slf4j
public class OrderController {

	OrderService orderService;
	MessageProducer messageProducer;
	CartService cartService;
	UserService userService;

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
		var order = orderService.getOrderById(userId, orderId, isAdmin());
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
		var successUrl = "http://localhost:8080/orders/%d/paypal/success?userId=%d".formatted(savedOrder.getOrderId(),
				userId);
		var cancelUrl = "http://localhost:8080/orders/%d/paypal/cancel".formatted(savedOrder.getOrderId());

		// Step 3: Send the PayPal payment URL
		if (paymentMethod.equals(PaymentMethod.PAYPAL)) {
			String paypalUrl = orderService.processPayment(savedOrder.getOrderId(), successUrl, cancelUrl);
			return ResponseEntity.ok(ApiResponse.builder().status("success")
					.message("PayPal payment URL generated successfully").data(Map.of("paypalUrl", paypalUrl)).build());
		} else if (paymentMethod.equals(PaymentMethod.CASH_ON_DELIVERY)) {
			// Remove items from cart
			cartService.removeItemsFromCart(userId, savedOrder.getOrderId());

			var adminId = userService.getAdminId();

			// Push notification of new order to Shop owner
			messageProducer.sendMessage(KafkaTopics.NOTIFICATION_DELIVERY,
					NotificationDTO.builder().channel(NotificationChannel.IN_APP).userId(adminId)
							.title("New order received")
							.message("New order received with order ID: %d".formatted(savedOrder.getOrderId()))
							.readStatus(false).actionUrl("/orders-management/%d".formatted(savedOrder.getOrderId()))
							.createdAt(LocalDateTime.now()).build());

			// For COD, just confirm the order
			return ResponseEntity.ok(ApiResponse.builder().status("success").message("Order placed successfully")
					.data(savedOrder).build());
		} else {
			throw new RuntimeException("Invalid payment method");
		}
	}

	@GetMapping("/{orderId}/paypal/success")
	public ResponseEntity<?> executePayPalPayment(@PathVariable Long orderId, @RequestParam String paymentId,
			@RequestParam("PayerID") String payerId, @RequestParam Long userId)
			throws PayPalRESTException, ParseException {
		// Execute the PayPal payment
		orderService.executePayPalPayment(orderId, paymentId, payerId);

		// Remove items from cart
		cartService.removeItemsFromCart(userId, orderId);

		// Push notification of new order to Shop owner
		messageProducer.sendMessage(KafkaTopics.NOTIFICATION_DELIVERY,
				NotificationDTO.builder().channel(NotificationChannel.IN_APP).title("New order received").userId(1L)
						.readStatus(false).message("New order received with order ID: %d".formatted(orderId))
						.createdAt(LocalDateTime.now()).actionUrl("/orders-management/%d".formatted(orderId)).build());

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

		var adminId = userService.getAdminId();

		// Push notification to Shop owner
		messageProducer.sendMessage(KafkaTopics.NOTIFICATION_DELIVERY,
				NotificationDTO.builder().channel(NotificationChannel.IN_APP).userId(adminId).title("Order cancelled!")
						.message("Order ID %d has been cancelled".formatted(order.getOrderId())).readStatus(false)
						.actionUrl("/orders-management/%d".formatted(order.getOrderId())).createdAt(LocalDateTime.now())
						.build());
		return ResponseEntity.ok(
				ApiResponse.builder().status("success").message("Order cancelled successfully").data(order).build());
	}

	@GetMapping("/management")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> getAllOrders(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "pending") String status) {
		// If userId is null, get all orders of all users for shop owner
		var orders = orderService.getOrdersByUserId(null, status, page, size);
		return ResponseEntity.ok(
				ApiResponse.builder().status("success").message("Orders retrieved successfully").data(orders).build());
	}

	@PutMapping("/management/{orderId}/confirm")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> confirmOrder(@PathVariable Long orderId) {
		orderService.updateOrderStatus(orderId, OrderStatus.PROCESSING);
		return ResponseEntity
				.ok(ApiResponse.builder().status("success").message("Orders updated successfully").build());
	}

	@PutMapping("/management/{orderId}/ship")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> shipOrder(@PathVariable Long orderId) {
		orderService.updateOrderStatus(orderId, OrderStatus.SHIPPED);
		return ResponseEntity
				.ok(ApiResponse.builder().status("success").message("Orders updated successfully").build());
	}

	@GetMapping("/order-count-by-date")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> findOrdersCountBySatusAndDate(@RequestParam @Min(1) Integer year,
			@RequestParam @Min(1) @Max(12) Integer month, @RequestParam @Min(1) Integer day) {
		if (year == null || month == null || day == null) {
			return ResponseEntity.badRequest().body("Year, Month, and Day parameters are required");
		}
		return ResponseEntity.ok(ApiResponse.builder().status("success")
				.message("Orders retrieved successfully for %d-%d-%d".formatted(year, month, day))
				.data(orderService.findOrdersCountBySatusAndDate(year, month, day)).build());
	}

	@GetMapping("/order-count-by-month")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> findOrdersCountByStatusAndMonth(@RequestParam(required = false) @Min(1) Integer year,
			@RequestParam(required = false) @Min(1) @Max(12) Integer month) {
		return ResponseEntity.ok(ApiResponse.builder().status("success")
				.message("Orders retrieved successfully for %d-%d".formatted(year, month))
				.data(orderService.findOrdersCountByStatusAndMonth(year, month)).build());
	}

	@GetMapping("/total-by-month")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> findTotalFinishedOrdersByMonth(@RequestParam(required = false) @Min(1) Integer year,
			@RequestParam @Min(1) @Max(12) Integer month) {
		return ResponseEntity.ok(ApiResponse.builder().status("success")
				.message("Orders retrieved successfully for %d-%d".formatted(year, month))
				.data(orderService.findTotalFinishedOrdersByMonth(year, month)).build());
	}

	@GetMapping("/total-by-year")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> findTotalFinishedOrdersByYear(@RequestParam(required = false) @Min(1) Integer year) {
		return ResponseEntity.ok(ApiResponse.builder().status("success")
				.message("Orders retrieved successfully for year %d".formatted(year))
				.data(orderService.findTotalFinishedOrdersByYear(year)).build());
	}

	@GetMapping("/monthly-count")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> findMonthlyOrderCount(@RequestParam(required = false) @Min(1) Integer year) {
		return ResponseEntity.ok(ApiResponse.builder().status("success")
				.message("Monthly orders retrieved successfully for year %d".formatted(year))
				.data(orderService.findMonthlyOrderCount(year)).build());
	}

	@GetMapping("/total-all")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> findTotalOrders() {
		return ResponseEntity.ok(ApiResponse.builder().status("success").message("Total orders retrieved successfully")
				.data(orderService.findTotalFinishedOrdersAllTime()).build());

	}

	private Long getUserId() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		return (Long) (authentication).getDetails();
	}

	private boolean isAdmin() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		log.info("Role Name: {}", authentication.getAuthorities());
		boolean isAdmin = authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
		return isAdmin;
	}

}
