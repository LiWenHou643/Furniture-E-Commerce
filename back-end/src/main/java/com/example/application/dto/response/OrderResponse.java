package com.example.application.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder(toBuilder = true)
public class OrderResponse {
    Long id;
    Long personId;
    String status;
    BigDecimal subTotal;
    BigDecimal discountPercentage;
    BigDecimal shipCost;
    BigDecimal total;
    String promoCode;
    String shippingAddress;
    String notes;
    PaymentResponse payment;
    List<OrderItemResponse> orderItems;
    LocalDateTime createdAt;
}
