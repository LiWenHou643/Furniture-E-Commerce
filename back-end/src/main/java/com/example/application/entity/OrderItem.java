package com.example.application.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Builder
@Table(name = "order_item")
public class OrderItem extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id; // Primary Key

    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "id", nullable = false)
    Orders orders;

    @OneToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id", nullable = false)
    Product product; // Foreign key to products table

    @Column(nullable = false)
    Integer quantity; // Number of items ordered

    @Column(nullable = false, precision = 5, scale = 2)
    @Builder.Default
    BigDecimal discountPercentage = BigDecimal.ZERO; // Discount for this specific item

    @Column(nullable = false, precision = 10, scale = 2)
    BigDecimal price; // Price per item

    @Column(precision = 10, scale = 2, insertable = false, updatable = false)
    BigDecimal discountedPrice; // Discount for this specific item

    @Column(precision = 10, scale = 2, insertable = false, updatable = false)
    BigDecimal totalPrice; // Total price for this item after discount
}
