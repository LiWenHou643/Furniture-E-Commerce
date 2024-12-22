package com.example.application.mapper;

import com.example.application.dto.BrandDTO;
import com.example.application.entity.Brand;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface BrandMapper {
    BrandMapper INSTANCE = Mappers.getMapper(BrandMapper.class);

    BrandDTO toDTO(Brand brand);

    Brand toEntity(BrandDTO brandDTO);
}
