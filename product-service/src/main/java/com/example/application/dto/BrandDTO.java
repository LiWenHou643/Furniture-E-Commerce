package com.example.application.dto;


import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class BrandDTO {
    Long brandId;
    String brandName;
    String brandDescription;
}
