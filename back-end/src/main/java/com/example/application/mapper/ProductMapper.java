package com.example.application.mapper;

import com.example.application.dto.ProductDTO;
import com.example.application.entity.Product;
import com.example.application.entity.ProductItem;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

    Product toEntity(ProductDTO productDTO);

    ProductDTO toDTO(Product product);

    void updateProductFromDTO(ProductDTO productDTO, @MappingTarget Product product);
}
