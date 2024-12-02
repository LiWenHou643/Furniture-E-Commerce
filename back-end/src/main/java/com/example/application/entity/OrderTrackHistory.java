package com.example.application.entity;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Builder
@Table(name = "order_status_history")
public class OrderTrackHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    Long orderId;

    @Enumerated(EnumType.STRING)
    OrderStatus status;

    @Column(name = "datetime")
    @Builder.Default
    LocalDateTime datetime = LocalDateTime.now();
}
