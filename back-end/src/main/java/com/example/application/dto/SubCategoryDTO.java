package com.example.application.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SubCategoryDTO {

        private String subCategoryId;
        private String subCategoryName;
        private String subCategoryDescription;

        @Override
        public String toString() {
            return "SubCategoryDTO{" +
                    "subCategoryId='" + subCategoryId + '\'' +
                    ", subCategoryName='" + subCategoryName + '\'' +
                    ", description='" + subCategoryDescription + '\'' +
                    '}';
        }
}
