package com.example.application.mapper;

import com.example.application.dto.ProductDTO;
import com.example.application.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", uses = {CategoryMapper.class, SubCategoryMapper.class})
public interface ProductMapper {
    Product toProduct(ProductDTO productDTO);

    ProductDTO toDTO(Product product);

    void updateProductFromDto(ProductDTO productDTO, @MappingTarget Product product);
}
