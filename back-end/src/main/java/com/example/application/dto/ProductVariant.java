package com.example.application.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductVariant {
    Long productItemId;
    Long productId;
    Long colorId;
    ColorDTO color;
    String sku;
    double originalPrice;
    double salePrice;
    int stockQuantity;
}
