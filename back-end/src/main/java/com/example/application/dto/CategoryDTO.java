package com.example.application.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class CategoryDTO {
    Long categoryId;
    String categoryName;
    String categoryDescription;
    String imageUrl;
    List<ProductDTO> productsList;
}
