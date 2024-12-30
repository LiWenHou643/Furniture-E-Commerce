package com.example.application.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

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
    List<AreaDTO> productAreas;
    List<ProductItemDTO> productItems;

    @Builder.Default
    double averageRating = 0.0;
    @Builder.Default
    int ratingCount = 0;
    @Builder.Default
    boolean productStatus = true;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    Long categoryId;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    Long brandId;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    Long materialId;
}
