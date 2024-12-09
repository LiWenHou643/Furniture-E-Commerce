package com.example.application.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;


@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class Product extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long productId;

    String productName;

    String productDescription;

    double productPrice = 0.0;

    double averageRating = 0.0;

    int quantity = 0;

    int ratingCount = 0;

    int productStatus = 1;  // 1 - Active, 0 - Inactive

    @ManyToOne
    @JoinColumn(name = "sub_category_id", nullable = false)
    SubCategory subCategory;  // Many products belong to one sub-category

    @OneToMany(mappedBy = "product")
    List<ProductImage> productImages;
}
