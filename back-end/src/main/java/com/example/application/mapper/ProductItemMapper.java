package com.example.application.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.application.dto.ProductItemDTO;
import com.example.application.entity.ProductItem;

@Mapper(componentModel = "spring", uses = {ProductImageMapper.class, ProductMapper.class})
public interface ProductItemMapper {
    @Mapping(target = "productId", source = "product.productId")
    @Mapping(target = "productName", source = "product.productName")
    @Mapping(target = "newProductImages", ignore = true)
    ProductItemDTO toDTO(ProductItem productItem);

    @Mapping(target = "product", ignore = true)
    @Mapping(target = "feedbacks", ignore = true)
    ProductItem toEntity(ProductItemDTO productItemDTO);
}
