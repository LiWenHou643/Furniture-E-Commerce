package com.example.application.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.application.dto.ProductDTO;
import com.example.application.entity.Product;

@Mapper(componentModel = "spring", uses = {AreaMapper.class, DescriptionDetailMapper.class,CategoryMapper.class, BrandMapper.class, MaterialMapper.class, ProductItemMapper.class, FeedbackMapper.class})
public interface ProductMapper {
	Product toEntity(ProductDTO productDTO);

	@Mapping(target = "brandId", source = "brand.brandId")
	@Mapping(target = "categoryId", source = "category.categoryId")
	@Mapping(target = "materialId", source = "material.materialId")
	@Mapping(target = "feedbacks", ignore = true)
	ProductDTO toDTO(Product product);
}
