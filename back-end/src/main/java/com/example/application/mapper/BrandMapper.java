package com.example.application.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.application.dto.BrandDTO;
import com.example.application.entity.Brand;

@Mapper(componentModel = "spring")
public interface BrandMapper {
	@Mapping(target = "brandId", source = "brandId")
	BrandDTO toDTO(Brand brand);

	@Mapping(target = "products", ignore = true)
	Brand toEntity(BrandDTO brandDTO);
}
