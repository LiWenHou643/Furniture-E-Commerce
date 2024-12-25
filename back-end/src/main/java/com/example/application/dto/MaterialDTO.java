package com.example.application.dto;


import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class MaterialDTO {
    Long materialId;
    String materialName;
    String materialDescription;
}
