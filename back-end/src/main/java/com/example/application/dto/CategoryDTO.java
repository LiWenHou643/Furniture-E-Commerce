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
public class CategoryDTO {

    Long categoryId;
    String categoryName;
    String categoryDescription;

    @Override
    public String toString() {
        return "CategoryDTO{" +
                "categoryId='" + categoryId + '\'' +
                ", categoryName='" + categoryName + '\'' +
                ", description='" + categoryDescription + '\'' +
                '}';
    }
}
