package com.example.application.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductResponse {
    Long id;
    String productCode;
    String title;
    String image;
    String description;
    String category;
    BigDecimal price;
    BigDecimal discountPercentage;
    int stockQuantity;
    int soldQuantity;
    boolean deleted;
}