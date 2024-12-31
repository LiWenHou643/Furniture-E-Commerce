package com.example.application.entity;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "cart_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class CartItem extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long cartItemId;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    Cart cart;

    Long productItemId;

    @OneToOne
    @JoinColumn(name = "product_id")
    Product product;

    int quantity = 1;
}
