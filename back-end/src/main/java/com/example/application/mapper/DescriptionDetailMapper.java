package com.example.application.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.application.dto.DescriptionDetailDTO;
import com.example.application.entity.DescriptionDetail;

@Mapper(componentModel = "spring")
public interface DescriptionDetailMapper {

	@Mapping(target = "productId", source = "product.productId")
	@Mapping(target = "detailId", source = "detailId")
	DescriptionDetailDTO toDTO(DescriptionDetail descriptionDetail);

	@Mapping(target = "product.productId", source = "productId")
	@Mapping(target = "detailId", source = "detailId")
	DescriptionDetail toEntity(DescriptionDetailDTO descriptionDetailDTO);

}
