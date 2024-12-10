package com.example.application.dto;

import com.example.application.entity.Product;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    Long productId;
    String productName;
    String productDescription;
    double productPrice;
    double averageRating;
    int ratingCount;
    CategoryDTO productCategory;
    SubCategoryDTO productSubCategory;
    int quantity;
    List<ProductImageDTO> productImages;
    int productStatus;
}
