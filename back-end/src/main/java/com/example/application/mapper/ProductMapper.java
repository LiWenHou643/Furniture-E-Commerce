package com.example.application.mapper;

import com.example.application.dto.request.ProductRequest;
import com.example.application.dto.response.ProductResponse;
import com.example.application.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    ProductMapper PRODUCT_MAPPER = Mappers.getMapper(ProductMapper.class);

    @Mapping(source = "category.name", target = "category")
    ProductResponse toProductResponse(Product product);

    Product toProductEntity(ProductRequest productRequest);
}
