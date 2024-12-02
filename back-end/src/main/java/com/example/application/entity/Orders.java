package com.example.application.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Builder
@Table(name = "orders")
public class Orders extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JoinColumn(name = "person_id", referencedColumnName = "id")
    Person person;

    @OneToMany(mappedBy = "orders", cascade = CascadeType.PERSIST, fetch = FetchType.LAZY, orphanRemoval = true)
    @Builder.Default
    Set<OrderItem> orderItems = new HashSet<>();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    OrderStatus status = OrderStatus.PENDING; // ENUM for status

    @OneToOne(mappedBy = "orders", cascade = CascadeType.PERSIST)
    @PrimaryKeyJoinColumn
    Payments payment;

    @Column(nullable = false, precision = 10, scale = 2)
    BigDecimal subTotal; // Total before discounts

    @Column(nullable = false, precision = 10, scale = 2)
    BigDecimal shipCost; // Shipping cost

    @Column(precision = 10, scale = 2, insertable = false, updatable = false)
    BigDecimal total; // Total after discounts

    @Column(nullable = false, precision = 10, scale = 2)
    BigDecimal discountPercentage; // Total discount

    String promoCode; // Applied promotion code

    @Column(nullable = false)
    String shippingAddress; // Shipping address

    String notes; // Additional notes
}
