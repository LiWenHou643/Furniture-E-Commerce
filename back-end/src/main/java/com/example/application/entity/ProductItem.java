package com.example.application.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "product_item")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ProductItem extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long productItemId;

    @ManyToOne
    @JoinColumn(name = "product_id")
    Product product;

    @OneToOne
    @JoinColumn(name = "color_id")
    Color color;

    String sku;

    double originalPrice;

    double sale_price;

    int quantity;

    int stockQuantity;

    @Builder.Default
    @OneToMany(mappedBy = "imageId")
    Set<ProductImage> productImages = new HashSet<>();
}
