package com.example.application.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductDTO {
    Long productId;
    String productName;
    String productDescription;
    CategoryDTO category;
    BrandDTO brand;
    MaterialDTO material;
    List<AreaDTO> areas;
    List<ProductItemDTO> productItems;
    List<FeedbackDTO> feedbacks;
    double averageRating;
    int soldQuantity;
    int ratingCount;
    boolean productStatus = true;

    Long categoryId;
    Long brandId;
    Long materialId;
}
