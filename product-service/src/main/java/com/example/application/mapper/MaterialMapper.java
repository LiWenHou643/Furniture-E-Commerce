package com.example.application.mapper;

import com.example.application.dto.MaterialDTO;
import com.example.application.entity.Material;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface MaterialMapper {
    MaterialMapper INSTANCE = Mappers.getMapper(MaterialMapper.class);

    MaterialDTO toDTO(Material material);

    Material toEntity(MaterialDTO materialDTO);
}
