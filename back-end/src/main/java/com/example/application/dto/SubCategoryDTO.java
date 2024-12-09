package com.example.application.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class SubCategoryDTO {

    Long subCategoryId;
    String subCategoryName;
    String subCategoryDescription;

    @Override
    public String toString() {
        return "SubCategoryDTO{" +
                "subCategoryId='" + subCategoryId + '\'' +
                ", subCategoryName='" + subCategoryName + '\'' +
                ", description='" + subCategoryDescription + '\'' +
                '}';
    }
}
