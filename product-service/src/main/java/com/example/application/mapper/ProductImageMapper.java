package com.example.application.mapper;

import com.example.application.dto.ProductImageDTO;
import com.example.application.entity.ProductImage;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ProductImageMapper {
    ProductImageMapper INSTANCE = Mappers.getMapper(ProductImageMapper.class);

    ProductImageDTO toDTO(ProductImage productImage);

    ProductImage toProductImage(ProductImageDTO productImageDTO);
}
