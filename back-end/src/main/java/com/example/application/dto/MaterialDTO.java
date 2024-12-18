package com.example.application.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class MaterialDTO {
    Long materialId;
    String materialName;
    String materialDescription;
}
