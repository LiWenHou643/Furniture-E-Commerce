package com.example.application.dto;

import com.example.application.constants.OrderStatus;
import com.example.application.constants.ShipmentMethod;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
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

    Date shipping_date;

    Date delivery_date;

    Date cancel_date;

    String shipping_address;

    ShipmentMethod shippingMethod;

    Double shipping_cost;

    String notes;

    Boolean leaveFeedback;

    Date created_at;

    List<OrderDetailDTO> orderDetails;
}
