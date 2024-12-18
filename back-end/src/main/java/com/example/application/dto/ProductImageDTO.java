package com.example.application.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class ProductImageDTO {
    Long imageId;
    String imageUrl;
    int isMainImage;
}
