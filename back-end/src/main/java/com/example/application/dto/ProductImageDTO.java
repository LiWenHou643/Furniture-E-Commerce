package com.example.application.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class ProductImageDTO {
    Long imageId;
    String imageUrl;
    int isMainImage;
}
