package com.example.application.mapper;

import com.example.application.dto.ProductDTO;
import com.example.application.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

    Product toProduct(ProductDTO productDTO);

    @Mapping(target = "productCategory", source = "category")
    @Mapping(target = "productBrand", source = "brand")
    @Mapping(target = "productMaterial", source = "material")
    ProductDTO toDTO(Product product);

    void updateProductFromDto(ProductDTO productDTO, @MappingTarget Product product);
}
