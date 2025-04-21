package com.example.application.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Year;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.application.config.Kafka.KafkaTopics;
import com.example.application.constants.NotificationChannel;
import com.example.application.constants.OrderStatus;
import com.example.application.constants.PaymentMethod;
import com.example.application.constants.PaymentStatus;
import com.example.application.dto.MonthlyOrderCountDTO;
import com.example.application.dto.NotificationDTO;
import com.example.application.dto.OrderCountByStatusDTO;
import com.example.application.dto.OrderDTO;
import com.example.application.dto.OrderDetailDTO;
import com.example.application.entity.Order;
import com.example.application.entity.OrderDetail;
import com.example.application.entity.Payments;
import com.example.application.entity.ProductImage;
import com.example.application.entity.ProductItem;
import com.example.application.entity.User;
import com.example.application.exception.InsufficientStockException;
import com.example.application.exception.ResourceNotFoundException;
import com.example.application.mapper.OrderDetailMapper;
import com.example.application.mapper.OrderMapper;
import com.example.application.producer.MessageProducer;
import com.example.application.repository.OrderRepository;
import com.example.application.repository.PaymentRepository;
import com.example.application.repository.ProductItemRepository;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;

import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class OrderService {

	OrderRepository orderRepository;
	PaymentRepository paymentRepository;
	ProductItemRepository productItemRepository;
	OrderDetailMapper orderDetailMapper;
	OrderMapper orderMapper;
	PayPalService payPalService;
	MessageProducer messageProducer;

	public Page<OrderDTO> getOrdersByUserId(Long userId, String status, int page, int size) {
		Pageable pageable = PageRequest.of(page, size);

		OrderStatus orderStatus = OrderStatus.valueOf(status.toUpperCase());

		// If userId is null, fetch all orders by status, else fetch orders by userId
		// and status
		Page<Order> orders = userId == null
				? orderRepository.findByOrderStatusOrderByCreatedAtDesc(orderStatus, pageable)
				: orderRepository.findByUser_UserIdAndOrderStatusOrderByCreatedAtDesc(userId, orderStatus, pageable);

		// Use the `map()` method to transform the Page<Order> into Page<OrderDTO>
		return orders.map(order -> {
			// Convert and sort OrderDetails by orderDetailId
			List<OrderDetailDTO> sortedOrderDetails = order.getOrderDetails().stream()
					.sorted(Comparator.comparing(OrderDetail::getOrderDetailId)).map(orderDetail -> {
						OrderDetailDTO orderDetailDTO = orderDetailMapper.toDTO(orderDetail);

						// Set the main product image URL
						orderDetailDTO.setProductImage(orderDetail.getProductItem().getProductImages().stream()
								.filter(ProductImage::isMainImage).findFirst().map(ProductImage::getImageUrl)
								.orElse(null));
						return orderDetailDTO;
					}).collect(Collectors.toList());

			// Map Order to OrderDTO and set sorted OrderDetails
			OrderDTO orderDTO = orderMapper.toDTO(order);
			orderDTO.setOrderDetails(sortedOrderDetails);
			return orderDTO;
		});
	}

	public List<OrderCountByStatusDTO> findOrdersCountBySatusAndDate(int year, int month, int day) {
		try {
			LocalDate.of(year, month, day);
		} catch (DateTimeException e) {
			throw new RuntimeException("Invalid date");
		}

		// Step 1: Initialize a map with all statuses and set count = 0
		Map<String, Long> statusCountMap = new HashMap<>();
		for (OrderStatus orderStatus : OrderStatus.values()) {
			statusCountMap.put(orderStatus.name(), 0L);
		}

		// Step 2: Fetch results from the database
		List<OrderCountByStatusDTO> orderStatusesList = orderRepository.findOrdersCountBySatusAndDate(year, month, day);

		// Step 3: Update the map with actual values from the database
		for (OrderCountByStatusDTO dto : orderStatusesList) {
			statusCountMap.put(dto.getStatus(), dto.getCount());
		}

		// Step 4: Sort the result by the enum order
		return Arrays.stream(OrderStatus.values()) // Use Arrays.stream() here
				.map(orderStatus -> new OrderCountByStatusDTO(orderStatus.name(), // Order status as the key
						statusCountMap.get(orderStatus.name()) // Fetch the count from the map
				)).collect(Collectors.toList()); // Collect as a list
	}

	public List<OrderCountByStatusDTO> findOrdersCountByStatusAndMonth(Integer year, Integer month) {

		if (year == null || year <= 0) {
			year = Year.now().getValue();
		}
		if (month == null) {
			month = LocalDate.now().getMonthValue();
		}

		// Step 1: Initialize a map with all statuses and set count = 0
		Map<String, Long> statusCountMap = new LinkedHashMap<>();
		for (OrderStatus orderStatus : OrderStatus.values()) {
			statusCountMap.put(orderStatus.name(), 0L);
		}

		// Step 2: Fetch results from the database
		List<OrderCountByStatusDTO> orderStatusesList = orderRepository.findOrdersCountByStatusAndMonth(year, month);

		// Step 3: Update the map with actual values from the database
		for (OrderCountByStatusDTO dto : orderStatusesList) {
			statusCountMap.put(dto.getStatus(), dto.getCount());
		}

		// Step 4: Sort the result by the enum order
		return Arrays.stream(OrderStatus.values()) // Use Arrays.stream() here
				.map(orderStatus -> new OrderCountByStatusDTO(orderStatus.name(), // Order status as the key
						statusCountMap.get(orderStatus.name()) // Fetch the count from the map
				)).collect(Collectors.toList()); // Collect as a list
	}

	public int findTotalFinishedOrdersAllTime() {
		return orderRepository.findTotalFinishedOrders();
	}

	public int findTotalFinishedOrdersByMonth(int year, int month) {
		return orderRepository.findTotalFinishedOrdersByMonth(year, month);
	}

	public int findTotalFinishedOrdersByYear(int year) {
		return orderRepository.findTotalFinishedOrdersByYear(year);
	}

	public List<MonthlyOrderCountDTO> findMonthlyOrderCount(Integer year) {
		if (year == null || year <= 0) {
			year = Year.now().getValue();
		}
		return orderRepository.findMonthlyFinishedOrderCount(year);
	}

	public OrderDTO getOrderById(Long userId, Long orderId, boolean isAdmin) {
		var order = orderRepository.findById(orderId)
				.orElseThrow(() -> new ResourceNotFoundException("Order", "id", orderId));

		// Check if the user has permission to access the order
		if (!order.getUser().getUserId().equals(userId) && !isAdmin) {
			throw new RuntimeException("You do not have permission to access this order.");
		}

		// Convert Set<OrderDetail> to List<OrderDetail> and sort by orderDetailId
		var orderDetails = order.getOrderDetails();
		var orderDetailsDto = orderDetails.stream().map(orderDetail -> {
			var orderDetailDTO = orderDetailMapper.toDTO(orderDetail);
			orderDetailDTO.setProductImage(orderDetail.getProductItem().getProductImages().stream()
					.filter(ProductImage::isMainImage).findFirst().map(ProductImage::getImageUrl).orElse(null));
			return orderDetailDTO;
		}).sorted(Comparator.comparing(OrderDetailDTO::getOrderDetailId)).collect(Collectors.toList());

		var orderDTO = orderMapper.toDTO(order);
		orderDTO.setOrderDetails(orderDetailsDto);
		orderDTO.setUserName(new StringBuilder().append(order.getUser().getLastName()).append(" ")
				.append(order.getUser().getFirstName()).toString());
		orderDTO.setUserEmail(order.getUser().getEmail());
		orderDTO.setUserPhone(order.getUser().getPhoneNumber());

		return orderDTO;
	}

	@Caching(evict = { @CacheEvict(value = "product", allEntries = true),
			@CacheEvict(value = "productList", allEntries = true) })
	@Transactional
	public OrderDTO createOrder(Long userId, OrderDTO orderDTO) {
		// Fetch or create user
		var user = new User();
		user.setUserId(userId);

		// Convert OrderDTO to Order entity
		var order = orderMapper.toEntity(orderDTO);
		order.setUser(user);
		order.setOrderStatus(OrderStatus.PENDING);

		// Collect all productItemIds from orderDetailDTOs
		Set<Long> productItemIds = orderDTO.getOrderDetails().stream().map(OrderDetailDTO::getProductItemId)
				.collect(Collectors.toSet());

		// Fetch all ProductItems in one query
		Map<Long, ProductItem> productItemMap = productItemRepository.findAllById(productItemIds).stream()
				.collect(Collectors.toMap(ProductItem::getProductItemId, Function.identity()));

		// Define subtotal and total
		// Use a single-element array to hold subtotal
		double[] subtotalHolder = new double[] { 0.0 };

		// Process OrderDetails
		Order finalOrder = order;
		var orderDetails = orderDTO.getOrderDetails().stream().map(orderDetailDTO -> {
			var orderDetail = orderDetailMapper.toEntity(orderDetailDTO);
			var productItem = productItemMap.get(orderDetailDTO.getProductItemId());

			if (productItem == null) {
				throw new ResourceNotFoundException("ProductItem", "id", orderDetailDTO.getProductItemId());
			}

			if (productItem.getSalePrice() != orderDetail.getPrice()) {
				throw new RuntimeException("Sale price mismatch for product item: " + productItem.getProductItemId());
			}

			// Check stock availability
			var orderedQuantity = orderDetailDTO.getQuantity();
			var availableQuantity = productItem.getStockQuantity();

			if (availableQuantity < orderedQuantity) {
				throw new InsufficientStockException("",
						productItem.getProduct().getProductName() + productItem.getColor().getColorName());
			}

			// Decrease stock quantity
			productItem.setStockQuantity(availableQuantity - orderedQuantity);

			orderDetail.setOrder(finalOrder);
			orderDetail.setProductItem(productItem);
			orderDetail.setTotal(orderDetailDTO.getQuantity() * orderDetailDTO.getPrice());

			// Calculate subtotal and total
			double price = productItem.getSalePrice();
			subtotalHolder[0] += price * orderedQuantity; // Update subtotal
			return orderDetail;
		}).collect(Collectors.toSet());

		// Access subtotal from the holder
		double subtotal = subtotalHolder[0];
		double total = subtotal + order.getShippingCost();

		// Set subtotal and total
		order.setSubtotal(subtotal);
		order.setTotal(total);
		order.setNotes(orderDTO.getNotes());
		order.setOrderDetails(orderDetails);

		// Save the order
		order = orderRepository.save(order);

		// Sort OrderDetails by orderDetailId and convert to DTOs
		List<OrderDetailDTO> sortedOrderDetails = order.getOrderDetails().stream()
				.sorted(Comparator.comparing(OrderDetail::getOrderDetailId)).map(orderDetailMapper::toDTO)
				.collect(Collectors.toList());

		// Convert Order to OrderDTO and set sorted OrderDetails
		OrderDTO savedOrderDTO = orderMapper.toDTO(order);
		savedOrderDTO.setOrderDetails(sortedOrderDetails);

		return savedOrderDTO;
	}

	@Caching(evict = { @CacheEvict(value = "product", allEntries = true),
			@CacheEvict(value = "productList", allEntries = true) })
	public OrderDTO cancelOrder(Long userId, Long orderId) {
		var order = orderRepository.findById(orderId)
				.orElseThrow(() -> new ResourceNotFoundException("Order", "id", orderId));

		if (!order.getUser().getUserId().equals(userId)) {
			throw new RuntimeException("You do not have permission to cancel this order.");
		}

		// Update order status to cancelled
		order.setOrderStatus(OrderStatus.CANCELLED);
		order.setCancelDate(LocalDateTime.now());

		// Update stock quantity for each product item
		order.getOrderDetails().forEach(orderDetail -> {
			var productItem = orderDetail.getProductItem();
			productItem.setStockQuantity(productItem.getStockQuantity() + orderDetail.getQuantity());
		});

		orderRepository.save(order);

		// Get product IDs from order details
		Set<Long> productIds = order.getOrderDetails().stream()
				.map(orderDetail -> orderDetail.getProductItem().getProduct().getProductId())
				.collect(Collectors.toSet());

		// Return OrderDTO

		return OrderDTO.builder().orderId(order.getOrderId()).orderStatus(order.getOrderStatus())
				.cancelDate(order.getCancelDate())
				.orderDetails(
						productIds.stream().map(productId -> OrderDetailDTO.builder().productId(productId).build())
								.collect(Collectors.toList()))
				.build();
	}

	public void updateOrderStatus(Long orderId, OrderStatus orderStatus) {
		var order = orderRepository.findById(orderId)
				.orElseThrow(() -> new ResourceNotFoundException("Order", "id", orderId));

		order.setOrderStatus(orderStatus);
		if (orderStatus == OrderStatus.PROCESSING) {
			order.setConfirmDate(LocalDateTime.now());
		} else if (orderStatus == OrderStatus.SHIPPED) {
			order.setShippingDate(LocalDateTime.now());
		} else if (orderStatus == OrderStatus.DELIVERED) {
			order.setDeliveryDate(LocalDateTime.now());
		}

		orderRepository.save(order);

		// Send notification
		NotificationDTO notificationDTO = NotificationDTO.builder().channel(NotificationChannel.IN_APP)
				.recipient(order.getUser().getEmail()).subject("Order Status Update")
				.userId(order.getUser().getUserId()).title("Order #%d".formatted(order.getOrderId()))
				.message("Your order #%d has been %s".formatted(order.getOrderId(), orderStatus.name().toLowerCase()))
				.readStatus(false).actionUrl("/orders/%d".formatted(order.getOrderId())).createdAt(LocalDateTime.now())
				.build();

		messageProducer.sendMessage(KafkaTopics.NOTIFICATION_DELIVERY, notificationDTO);
	}

	public String processPayment(Long orderId, String successUrl, String cancelUrl) throws PayPalRESTException {
		Order order = orderRepository.findById(orderId)
				.orElseThrow(() -> new ResourceNotFoundException("Order", "id", orderId));

		Payment payment = payPalService.createPayment(order.getTotal(), "USD", "paypal", "sale",
				"Order #%d".formatted(order.getOrderId()), cancelUrl, successUrl);

		// Redirect user to PayPal approval URL
		for (com.paypal.api.payments.Links link : payment.getLinks()) {
			if (link.getRel().equals("approval_url")) {
				return link.getHref();
			}
		}

		throw new RuntimeException("Failed to generate PayPal payment URL");
	}

	public void executePayPalPayment(Long orderId, String paymentId, String payerId)
			throws PayPalRESTException, ParseException {
		Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));

		// Execute PayPal payment
		Payment payment = payPalService.executePayment(paymentId, payerId);

		if (payment.getState().equalsIgnoreCase("approved")) { // Case-insensitive check
			// Update order status
			Payments payments = Payments.builder().order(order)
					.paymentDate(new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'").parse(payment.getCreateTime()))
					.paymentAmount(order.getTotal()).paymentMethod(PaymentMethod.PAYPAL)
					.paymentStatus(PaymentStatus.PAID).transactionReference(payment.getId()).build();

			// Save payment
			paymentRepository.save(payments);

			//
		} else {
			throw new RuntimeException("Payment failed");
		}
	}

	public void deleteOrder(Long orderId) {
		orderRepository.deleteById(orderId);
	}

}
