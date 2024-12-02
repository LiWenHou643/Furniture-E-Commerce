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
@Table(name = "cart_item")
public class CartItem extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "quantity")
    int quantity;

    @Column(precision = 10, scale = 2)
    BigDecimal price;

    @Column(precision = 5, scale = 2)
    BigDecimal discountPercentage;

    @Access(AccessType.PROPERTY)
    @Column(name = "discounted_price", precision = 10, scale = 2, insertable = false, updatable = false)
    BigDecimal discountedPrice;


    @Access(AccessType.PROPERTY)
    @Column(name = "total_price", precision = 10, scale = 2, insertable = false, updatable = false)
    BigDecimal totalPrice;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    Product product;

    @ManyToOne
    @JoinColumn(name = "cart_id", referencedColumnName = "id")
    Cart cart;
}
