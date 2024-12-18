package com.example.application.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class ProductItemDTO {
    Long productItemId;
    ProductDTO product;
    ColorDTO color;
    String sku;
    int quantity;
    double originalPrice;
    double salePrice;
    int stockQuantity;
}
