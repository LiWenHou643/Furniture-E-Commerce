package com.example.application.dto;

import com.example.application.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
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
