package com.example.application.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.example.application.dto.ProductImageDTO;
import com.example.application.entity.ProductImage;

@Mapper(componentModel = "spring")
public interface ProductImageMapper {
	ProductImageMapper INSTANCE = Mappers.getMapper(ProductImageMapper.class);

	ProductImageDTO toDTO(ProductImage productImage);

	ProductImage toEntity(ProductImageDTO productImageDTO);
}
