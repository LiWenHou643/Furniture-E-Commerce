package com.example.application.entity;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.HashSet;
import java.util.Set;


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
    String productId;

    String productName;

    String productDescription;

    double averageRating = 0.0;

    int ratingCount = 0;

    @Builder.Default
    boolean productStatus = true;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    Category category;

    @ManyToOne
    @JoinColumn(name = "brand_id", nullable = false)
    Brand brand;

    @ManyToOne
    @JoinColumn(name = "material_id", nullable = false)
    Material material;

    @Builder.Default
    @ManyToMany(mappedBy = "products")
    Set<Area> areas = new HashSet<>();

    @OneToMany(mappedBy = "product")
    Set<ProductItem> productItems = new HashSet<>();

}
