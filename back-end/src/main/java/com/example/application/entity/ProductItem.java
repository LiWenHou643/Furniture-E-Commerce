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

    @Column(unique = true, nullable = false)
    String sku;

    @Column(nullable = false)
    double originalPrice;

    @Column(nullable = false)
    double salePrice;

    @Column(nullable = false)
    int stockQuantity;

    @Builder.Default
    @OneToMany(mappedBy = "imageId", cascade = CascadeType.ALL, orphanRemoval = true)
    Set<ProductImage> productImages = new HashSet<>();
}
