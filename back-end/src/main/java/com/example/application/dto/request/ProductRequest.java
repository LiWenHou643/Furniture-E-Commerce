package com.example.application.dto.request;

import java.math.BigDecimal;

public record ProductRequest(
        Long id,
        Long categoryId,
        String productCode,
        String title,
        String image,
        String description,
        BigDecimal price,
        BigDecimal discountPercentage,
        int stockQuantity,
        int soldQuantity
) {
}