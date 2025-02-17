package com.example.application.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.example.application.dto.CategoryDTO;
import com.example.application.entity.Category;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
	CategoryMapper INSTANCE = Mappers.getMapper(CategoryMapper.class);

	CategoryDTO toDTO(Category category);

	Category toEntity(CategoryDTO categoryDTO);
}
