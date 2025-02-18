package com.example.application.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.example.application.dto.AreaDTO;
import com.example.application.entity.Area;

@Mapper(componentModel = "spring")
public interface AreaMapper {
	AreaMapper INSTANCE = Mappers.getMapper(AreaMapper.class);

	AreaDTO toDTO(Area area);

	@Mapping(target = "products", ignore = true)
	Area toEntity(AreaDTO areaDTO);
}
