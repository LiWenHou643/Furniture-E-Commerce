package com.example.application.mapper;

import com.example.application.dto.ProductDTO;
import com.example.application.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", uses = {CategoryMapper.class, SubCategoryMapper.class})
public interface ProductMapper {
    ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

    Product toProduct(ProductDTO productDTO);

    @Mapping(target = "productCategory", source = "subCategory.category")
    @Mapping(target = "productSubCategory", source = "subCategory")
    @Mapping(target = "productImages",  source = "productImages")
    ProductDTO toDTO(Product product);

    void updateProductFromDto(ProductDTO productDTO, @MappingTarget Product product);
}
