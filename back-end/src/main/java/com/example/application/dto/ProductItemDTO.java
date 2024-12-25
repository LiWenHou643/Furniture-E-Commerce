package com.example.application.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
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
