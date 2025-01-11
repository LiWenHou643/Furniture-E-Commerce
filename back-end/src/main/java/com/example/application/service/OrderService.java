package com.example.application.service;

import com.example.application.constants.OrderStatus;
import com.example.application.constants.PaymentMethod;
import com.example.application.constants.PaymentStatus;
import com.example.application.dto.OrderDTO;
import com.example.application.dto.OrderDetailDTO;
import com.example.application.entity.Order;
import com.example.application.entity.OrderDetail;
import com.example.application.entity.Payments;
import com.example.application.entity.User;
import com.example.application.exception.ResourceNotFoundException;
import com.example.application.mapper.OrderDetailMapper;
import com.example.application.mapper.OrderMapper;
import com.example.application.repository.OrderRepository;
import com.example.application.repository.PaymentRepository;
import com.example.application.repository.ProductItemRepository;
import com.example.application.repository.ProductRepository;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
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

    public OrderDTO createOrder(Long userId, OrderDTO orderDTO) {
        var user = new User();
        user.setUserId(userId);

        var order = OrderMapper.INSTANCE.toEntity(orderDTO);
        order.setUser(user);
        order.setOrderStatus(OrderStatus.pending);

        var orderDetails = orderDTO.getOrderDetails().stream()
                                   .map(orderDetailDTO -> {
                                       var orderDetail = OrderDetailMapper.INSTANCE.toEntity(orderDetailDTO);
                                       var productItem = productItemRepository.findById(
                                                                                      orderDetailDTO.getProductItemId())
                                                                              .orElseThrow(
                                                                                      () -> new ResourceNotFoundException(
                                                                                              "ProductItem", "id",
                                                                                              orderDetailDTO.getProductItemId()));
                                       orderDetail.setOrder(order);
                                       orderDetail.setProduct(productItem.getProduct());
                                       orderDetail.setProductItem(productItem);
                                       return orderDetail;
                                   })
                                   .collect(Collectors.toSet());

        order.setOrderDetails(orderDetails);
        orderRepository.save(order);

        // Convert and sort OrderDetails by orderDetailId
        List<OrderDetailDTO> sortedOrderDetails = order.getOrderDetails().stream()
                                                       .sorted(Comparator.comparing(OrderDetail::getOrderDetailId))
                                                       .map(OrderDetailMapper.INSTANCE::toDTO)
                                                       .collect(Collectors.toList());

        // Map Order to OrderDTO and set sorted OrderDetails
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
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Order", "id", orderId));

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
