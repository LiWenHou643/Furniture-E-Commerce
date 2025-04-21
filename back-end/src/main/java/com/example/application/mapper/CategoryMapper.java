package com.example.application.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.application.dto.CategoryDTO;
import com.example.application.entity.Category;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

	@Mapping(target = "categoryId", source = "categoryId")
	CategoryDTO toDTO(Category category);

	@Mapping(target = "products", ignore = true)
	Category toEntity(CategoryDTO categoryDTO);
}
