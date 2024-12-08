package com.example.application.mapper;

import com.example.application.dto.SubCategoryDTO;
import com.example.application.entity.SubCategory;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface SubCategoryMapper {
    CategoryMapper INSTANCE = Mappers.getMapper(CategoryMapper.class);

    SubCategoryDTO toDTO(SubCategory subCategory);

    SubCategory toSubCategory(SubCategoryDTO subCategoryDTO);
}
