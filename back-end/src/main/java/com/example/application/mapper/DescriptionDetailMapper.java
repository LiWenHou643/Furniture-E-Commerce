package com.example.application.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.example.application.dto.DescriptionDetailDTO;
import com.example.application.entity.DescriptionDetail;

@Mapper(componentModel = "spring")
public interface DescriptionDetailMapper {
	DescriptionDetailMapper INSTANCE = Mappers.getMapper(DescriptionDetailMapper.class);

	@Mapping(target = "productId", source = "product.productId")
	@Mapping(target = "detailId", source = "detailId")
	DescriptionDetailDTO toDTO(DescriptionDetail descriptionDetail);

	@Mapping(target = "product.productId", source = "productId")
	@Mapping(target = "detailId", source = "detailId")
	DescriptionDetail toEntity(DescriptionDetailDTO descriptionDetailDTO);

}
