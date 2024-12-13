package com.example.application.dto;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductFeedbackDTO {
    Long orderId;
    Long customerId;
    Long productId;
    String feedback;
    Integer rating;
    String customerName;
    String productName;
    String productCategory;
    String productDescription;
    String productImage;
    String productPrice;
    String productBrand;
    String productColor;
    String productSize;
    String productMaterial;
    String productType;
}
