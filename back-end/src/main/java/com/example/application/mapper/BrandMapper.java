package com.example.application.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.example.application.dto.BrandDTO;
import com.example.application.entity.Brand;

@Mapper(componentModel = "spring")
public interface BrandMapper {
	BrandMapper INSTANCE = Mappers.getMapper(BrandMapper.class);

	BrandDTO toDTO(Brand brand);

	@Mapping(target = "products", ignore = true)
	Brand toEntity(BrandDTO brandDTO);
}
