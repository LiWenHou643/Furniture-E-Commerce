package com.example.application.mapper;

import com.example.application.dto.CategoryDTO;
import com.example.application.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryMapper INSTANCE = Mappers.getMapper(CategoryMapper.class);
    CategoryDTO toDTO(Category category);
    Category toCategory(CategoryDTO categoryDTO);
}
