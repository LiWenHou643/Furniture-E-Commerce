package com.example.application.service;

import com.example.application.constants.OrderStatus;
import com.example.application.constants.PaymentMethod;
import com.example.application.constants.PaymentStatus;
import com.example.application.dto.OrderDTO;
import com.example.application.dto.OrderDetailDTO;
import com.example.application.entity.*;
import com.example.application.exception.ResourceNotFoundException;
import com.example.application.mapper.OrderDetailMapper;
import com.example.application.mapper.OrderMapper;
import com.example.application.repository.OrderRepository;
import com.example.application.repository.PaymentRepository;
import com.example.application.repository.ProductItemRepository;
import com.example.application.repository.ProductRepository;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class OrderService {

    OrderRepository orderRepository;
    PayPalService payPalService;
    PaymentRepository paymentRepository;
    ProductItemRepository productItemRepository;
    private final ProductRepository productRepository;

    public List<OrderDTO> getOrdersByUserId(Long userId) {
        // Fetch and sort orders directly in the database using the index
        var orders = orderRepository.findByUser_UserIdOrderByCreatedAtDescOrderStatusAsc(userId);

        // Map orders to DTOs
        return orders.stream()
                     .map(order -> {
                         // Convert and sort OrderDetails by orderDetailId
                         List<OrderDetailDTO> sortedOrderDetails = order.getOrderDetails().stream()
                                                                        .sorted(Comparator.comparing(
                                                                                OrderDetail::getOrderDetailId))
                                                                        .map(OrderDetailMapper.INSTANCE::toDTO)
                                                                        .collect(Collectors.toList());

                         // Map Order to OrderDTO and set sorted OrderDetails
                         OrderDTO orderDTO = OrderMapper.INSTANCE.toDTO(order);
                         orderDTO.setOrderDetails(sortedOrderDetails);
                         return orderDTO;
                     })
                     .collect(Collectors.toList());
    }

    public OrderDTO getOrderById(Long userId, Long orderId) {
        var order = orderRepository.findById(orderId)
                                   .orElseThrow(() -> new ResourceNotFoundException("Order", "id", orderId));

        if (!order.getUser().getUserId().equals(userId)) {
            throw new RuntimeException("You do not have permission to access this order.");
        }

        // Convert Set<OrderDetail> to List<OrderDetail> and sort by orderDetailId
        var sortedOrderDetails = new ArrayList<>(order.getOrderDetails());
        sortedOrderDetails.sort(Comparator.comparing(OrderDetail::getOrderDetailId));

        var orderDTO = OrderMapper.INSTANCE.toDTO(order);
        orderDTO.setOrderDetails(sortedOrderDetails.stream()
                                                   .map(OrderDetailMapper.INSTANCE::toDTO)
                                                   .collect(Collectors.toList()));

        return orderDTO;
    }

    @Transactional
    public OrderDTO createOrder(Long userId, OrderDTO orderDTO) {
        // Fetch or create user
        var user = new User();
        user.setUserId(userId);

        // Convert OrderDTO to Order entity
        var order = OrderMapper.INSTANCE.toEntity(orderDTO);
        order.setUser(user);
        order.setOrderStatus(OrderStatus.pending);

        // Collect all productItemIds from orderDetailDTOs
        Set<Long> productItemIds = orderDTO.getOrderDetails().stream()
                                           .map(OrderDetailDTO::getProductItemId)
                                           .collect(Collectors.toSet());

        // Fetch all ProductItems in one query
        Map<Long, ProductItem> productItemMap = productItemRepository.findAllById(productItemIds)
                                                                     .stream()
                                                                     .collect(Collectors.toMap(
                                                                             ProductItem::getProductItemId,
                                                                             Function.identity()));

        // Process OrderDetails
        Order finalOrder = order;
        var orderDetails = orderDTO.getOrderDetails().stream()
                                   .map(orderDetailDTO -> {
                                       var orderDetail = OrderDetailMapper.INSTANCE.toEntity(orderDetailDTO);
                                       var productItem = productItemMap.get(orderDetailDTO.getProductItemId());

                                       if (productItem == null) {
                                           throw new ResourceNotFoundException("ProductItem", "id",
                                                   orderDetailDTO.getProductItemId());
                                       }

                                       // Check stock availability
                                       var orderedQuantity = orderDetailDTO.getQuantity();
                                       var availableQuantity = productItem.getStockQuantity();

                                       if (availableQuantity < orderedQuantity) {
                                           throw new ResponseStatusException(
                                                   HttpStatus.BAD_REQUEST,
                                                   "Insufficient stock for ProductItem id: " + productItem.getProductItemId()
                                           );
                                       }

                                       // Decrease stock quantity
                                       productItem.setStockQuantity(availableQuantity - orderedQuantity);

                                       orderDetail.setOrder(finalOrder);
                                       orderDetail.setProduct(productItem.getProduct());
                                       orderDetail.setProductItem(productItem);
                                       return orderDetail;
                                   })
                                   .collect(Collectors.toSet());

        order.setOrderDetails(orderDetails);

        // Save the order
        order = orderRepository.save(order);

        // Sort OrderDetails by orderDetailId and convert to DTOs
        List<OrderDetailDTO> sortedOrderDetails = order.getOrderDetails().stream()
                                                       .sorted(Comparator.comparing(OrderDetail::getOrderDetailId))
                                                       .map(OrderDetailMapper.INSTANCE::toDTO)
                                                       .collect(Collectors.toList());

        // Convert Order to OrderDTO and set sorted OrderDetails
        OrderDTO savedOrderDTO = OrderMapper.INSTANCE.toDTO(order);
        savedOrderDTO.setOrderDetails(sortedOrderDetails);

        return savedOrderDTO;
    }

    public OrderDTO cancelOrder(Long orderId) {
        var order = orderRepository.findById(orderId)
                                   .orElseThrow(() -> new ResourceNotFoundException("Order", "id", orderId));


        order.setOrderStatus(OrderStatus.cancelled);
        order.setCancelDate(Date.from(new Date().toInstant()));
        orderRepository.save(order);

        // Convert and sort OrderDetails by orderDetailId
        List<OrderDetailDTO> sortedOrderDetails = order.getOrderDetails().stream()
                                                       .sorted(Comparator.comparing(OrderDetail::getOrderDetailId))
                                                       .map(OrderDetailMapper.INSTANCE::toDTO)
                                                       .collect(Collectors.toList());

        // Map Order to OrderDTO and set sorted OrderDetails
        OrderDTO orderDTO = OrderMapper.INSTANCE.toDTO(order);
        orderDTO.setOrderDetails(sortedOrderDetails);

        return orderDTO;
    }

    public String processPayment(Long orderId, String successUrl, String cancelUrl) throws PayPalRESTException {
        Order order = orderRepository.findById(orderId)
                                     .orElseThrow(() -> new ResourceNotFoundException("Order", "id", orderId));

        Payment payment = payPalService.createPayment(
                order.getTotal(),
                "USD",
                "paypal",
                "sale",
                "Order #%d".formatted(order.getOrderId()),
                cancelUrl,
                successUrl
        );

        // Redirect user to PayPal approval URL
        for (com.paypal.api.payments.Links link : payment.getLinks()) {
            if (link.getRel().equals("approval_url")) {
                return link.getHref();
            }
        }

        throw new RuntimeException("Failed to generate PayPal payment URL");
    }

    public String executePayPalPayment(Long orderId, String paymentId, String payerId) throws PayPalRESTException {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));

        // Execute PayPal payment
        Payment payment = payPalService.executePayment(paymentId, payerId);

        if (payment.getState().equals("approved")) {
            // Update order status
            order.setOrderStatus(OrderStatus.valueOf("PAID"));
            Payments payments = Payments.builder()
                                        .order(order)
                                        .paymentDate(payment.getCreateTime())
                                        .paymentAmount(order.getTotal())
                                        .paymentMethod(PaymentMethod.paypal)
                                        .paymentStatus(PaymentStatus.paid)
                                        .transactionReference(payment.getId())
                                        .build();

            // Save payment
            paymentRepository.save(payments);
            return "Payment successful! Order ID: " + orderId;
        }

        throw new RuntimeException("Payment failed");
    }
}
