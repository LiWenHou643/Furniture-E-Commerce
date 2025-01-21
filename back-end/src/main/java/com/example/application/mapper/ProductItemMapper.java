package com.example.application.mapper;

import com.example.application.dto.ProductItemDTO;
import com.example.application.entity.ProductItem;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ProductItemMapper {
    ProductItemMapper INSTANCE = Mappers.getMapper(ProductItemMapper.class);

    @Mapping(target = "productId", source = "product.productId")
    @Mapping(target = "productName", source = "product.productName")
    ProductItemDTO toDTO(ProductItem productItem);

    ProductItem toEntity(ProductItemDTO productItemDTO);
}
