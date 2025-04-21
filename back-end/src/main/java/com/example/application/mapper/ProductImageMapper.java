package com.example.application.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.application.dto.ProductImageDTO;
import com.example.application.entity.ProductImage;

@Mapper(componentModel = "spring")
public interface ProductImageMapper {
	@Mapping(target = "file", ignore = true)
	ProductImageDTO toDTO(ProductImage productImage);

	@Mapping(target = "productItem", ignore = true)
	ProductImage toEntity(ProductImageDTO productImageDTO);
}
