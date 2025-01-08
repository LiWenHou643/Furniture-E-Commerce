package com.example.application.entity;

import com.example.application.constants.OrderStatus;
import com.example.application.constants.ShipmentMethod;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class Order extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long orderId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    double subtotal;

    double total;

    OrderStatus orderStatus;

    Date shipping_date;

    Date delivery_date;

    Date cancel_date;

    String shipping_address;

    ShipmentMethod shippingMethod;

    double shipping_cost;

    String notes;

    boolean leaveFeedback;

}
