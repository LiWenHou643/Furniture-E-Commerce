package com.example.application.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;


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
    Integer productId;

    @Column(name = "product_name", nullable = false)
    String productName;

    @Column(name = "product_description")
    String productDescription;

    @Column(name = "average_rating", columnDefinition = "DECIMAL(3,2) DEFAULT 0")
    Double averageRating = 0.0;

    @Column(name = "rating_count", columnDefinition = "INT DEFAULT 0")
    Integer ratingCount = 0;

    @ManyToOne
    @JoinColumn(name = "sub_category_id", nullable = false)
    SubCategory subCategory;  // Many products belong to one sub-category
}
