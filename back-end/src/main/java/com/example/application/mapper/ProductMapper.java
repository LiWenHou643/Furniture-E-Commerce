package com.example.application.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import com.example.application.dto.ProductDTO;
import com.example.application.entity.Product;

@Mapper(componentModel = "spring")
public interface ProductMapper {
	ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

	Product toEntity(ProductDTO productDTO);

	ProductDTO toDTO(Product product);

	void updateProductFromDTO(ProductDTO productDTO, @MappingTarget Product product);
}
