package com.example.application.dto;

import com.example.application.constants.OrderStatus;
import com.example.application.constants.PaymentMethod;
import com.example.application.constants.ShipmentMethod;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class OrderDTO {
    Long orderId;

    Long userId;

    Double subtotal;

    Double total;

    OrderStatus orderStatus;

    LocalDateTime shippingDate;

    LocalDateTime deliveryDate;

    LocalDateTime cancelDate;

    String shippingAddress;

    ShipmentMethod shippingMethod;

    @Enumerated(EnumType.STRING)
    PaymentMethod paymentMethod;

    Double shippingCost;

    String notes;

    Boolean leaveFeedback;

    LocalDateTime createdAt;

    LocalDateTime updatedAt;

    List<OrderDetailDTO> orderDetails;
}
