package com.example.application.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class OrderItemResponse {
    Long id;
    Long productId;
    String productName;
    String productImage;
    Integer quantity;
    BigDecimal price;
    BigDecimal discountPercentage;
    BigDecimal discountedPrice;
    BigDecimal totalPrice;
}
