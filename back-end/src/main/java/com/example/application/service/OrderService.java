package com.example.application.service;

import com.example.application.constants.OrderStatus;
import com.example.application.constants.PaymentMethod;
import com.example.application.constants.PaymentStatus;
import com.example.application.dto.OrderDTO;
import com.example.application.dto.OrderDetailDTO;
import com.example.application.entity.*;
import com.example.application.exception.InsufficientStockException;
import com.example.application.exception.ResourceNotFoundException;
import com.example.application.mapper.OrderDetailMapper;
import com.example.application.mapper.OrderMapper;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class OrderService {

    OrderRepository orderRepository;
    PayPalService payPalService;
    PaymentRepository paymentRepository;
    ProductItemRepository productItemRepository;

    public Page<OrderDTO> getOrdersByUserId(Long userId, String status, Pageable pageable) {
        OrderStatus orderStatus = OrderStatus.valueOf(status);
        // Fetch orders based on the userId
        Page<Order> orders =
                orderRepository.findByUser_UserIdAndOrderStatusOrderByCreatedAtDesc(userId, orderStatus, pageable);

        // Use the `map()` method to transform the Page<Order> into Page<OrderDTO>
        return orders.map(order -> {
            // Convert and sort OrderDetails by orderDetailId
            List<OrderDetailDTO> sortedOrderDetails = order.getOrderDetails().stream()
                                                           .sorted(Comparator.comparing(OrderDetail::getOrderDetailId))
                                                           .map(orderDetail -> {
                                                               OrderDetailDTO orderDetailDTO = OrderDetailMapper.INSTANCE.toDTO(
                                                                       orderDetail);

                                                               // Set the main product image URL
                                                               orderDetailDTO.setProductImage(
                                                                       orderDetail.getProductItem()
                                                                                  .getProductImages()
                                                                                  .stream()
                                                                                  .filter(ProductImage::isMainImage)
                                                                                  .findFirst()
                                                                                  .map(ProductImage::getImageUrl)
                                                                                  .orElse(null)
                                                               );
                                                               return orderDetailDTO;
                                                           })
                                                           .collect(Collectors.toList());

            // Map Order to OrderDTO and set sorted OrderDetails
            OrderDTO orderDTO = OrderMapper.INSTANCE.toDTO(order);
            orderDTO.setOrderDetails(sortedOrderDetails);
            return orderDTO;
        });
    }

    public OrderDTO getOrderById(Long userId, Long orderId) {
        var order = orderRepository.findById(orderId)
                                   .orElseThrow(() -> new ResourceNotFoundException("Order", "id", orderId));

        if (!order.getUser().getUserId().equals(userId)) {
            throw new RuntimeException("You do not have permission to access this order.");
        }

        // Convert Set<OrderDetail> to List<OrderDetail> and sort by orderDetailId
        var orderDetails = order.getOrderDetails();
        var orderDetailsDto = orderDetails.stream().map(
                                                  orderDetail -> {
                                                      var orderDetailDTO = OrderDetailMapper.INSTANCE.toDTO(orderDetail);
                                                      orderDetailDTO.setProductImage(orderDetail.getProductItem().getProductImages().stream().filter(
                                                              ProductImage::isMainImage).findFirst().map(ProductImage::getImageUrl).orElse(null));
                                                      return orderDetailDTO;
                                                  }
                                          )
                                          .sorted(Comparator.comparing(OrderDetailDTO::getOrderDetailId))
                                          .collect(Collectors.toList());

        var orderDTO = OrderMapper.INSTANCE.toDTO(order);
        orderDTO.setOrderDetails(orderDetailsDto);

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

        // Define subtotal and total
        // Use a single-element array to hold subtotal
        double[] subtotalHolder = new double[]{0.0};

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

                                       if (productItem.getSalePrice() != orderDetail.getPrice()) {
                                           throw new RuntimeException(
                                                   "Sale price mismatch for product item: " + productItem.getProductItemId());
                                       }

                                       // Check stock availability
                                       var orderedQuantity = orderDetailDTO.getQuantity();
                                       var availableQuantity = productItem.getStockQuantity();

                                       if (availableQuantity < orderedQuantity) {
                                           throw new InsufficientStockException("", productItem.getProduct()
                                                                                               .getProductName() + productItem.getColor()
                                                                                                                              .getColorName());
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
                                   })
                                   .collect(Collectors.toSet());

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
                                                       .sorted(Comparator.comparing(OrderDetail::getOrderDetailId))
                                                       .map(OrderDetailMapper.INSTANCE::toDTO)
                                                       .collect(Collectors.toList());

        // Convert Order to OrderDTO and set sorted OrderDetails
        OrderDTO savedOrderDTO = OrderMapper.INSTANCE.toDTO(order);
        savedOrderDTO.setOrderDetails(sortedOrderDetails);

        return savedOrderDTO;
    }

    public void cancelOrder(Long userId, Long orderId) {
        var order = orderRepository.findById(orderId)
                                   .orElseThrow(() -> new ResourceNotFoundException("Order", "id", orderId));

        if (!order.getUser().getUserId().equals(userId)) {
            throw new RuntimeException("You do not have permission to cancel this order.");
        }

        // Update order status to cancelled
        order.setOrderStatus(OrderStatus.cancelled);
        order.setCancelDate(LocalDateTime.now());

        // Update stock quantity for each product item
        order.getOrderDetails().forEach(orderDetail -> {
            var productItem = orderDetail.getProductItem();
            productItem.setStockQuantity(productItem.getStockQuantity() + orderDetail.getQuantity());
        });

        orderRepository.save(order);
    }

    public void updateOrderStatus(Long orderId, OrderStatus orderStatus) {
        var order = orderRepository.findById(orderId)
                                   .orElseThrow(() -> new ResourceNotFoundException("Order", "id", orderId));

        order.setOrderStatus(orderStatus);
        if (orderStatus == OrderStatus.shipped) {
            order.setShippingDate(LocalDateTime.now());
        } else if (orderStatus == OrderStatus.delivered) {
            order.setDeliveryDate(LocalDateTime.now());
        }

        orderRepository.save(order);
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

    public String executePayPalPayment(Long orderId, String paymentId, String payerId) throws PayPalRESTException, ParseException {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));

        // Execute PayPal payment
        Payment payment = payPalService.executePayment(paymentId, payerId);

        if (payment.getState().equals("approved")) {
            // Update order status
            Payments payments = Payments.builder()
                                        .order(order)
                                        .paymentDate(new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'").parse(
                                                payment.getCreateTime()))
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

    public String deleteOrder(Long orderId) {
        orderRepository.deleteById(orderId);
        return "Order deleted successfully";
    }
}
