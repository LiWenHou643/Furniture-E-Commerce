package com.example.application.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "product_images")
public class ProductImage extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long imageId;

    @ManyToOne
    @JoinColumn(name = "productItemId", nullable = false)
    ProductItem productItem;

    @Column(nullable = false)
    String imageUrl;

    @Builder.Default
    boolean isMainImage = false;

    public ProductImage(boolean isMainImage) {
        this.isMainImage = isMainImage;
    }
}
