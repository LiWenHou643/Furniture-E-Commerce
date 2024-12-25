package com.example.application.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class ProductDTO {
    Long productId;
    String productName;
    String productDescription;
    CategoryDTO productCategory;
    BrandDTO productBrand;
    MaterialDTO productMaterial;
    double averageRating;
    int ratingCount;
    boolean productStatus;
}
