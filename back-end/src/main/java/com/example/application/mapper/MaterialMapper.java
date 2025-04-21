package com.example.application.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.application.dto.MaterialDTO;
import com.example.application.entity.Material;

@Mapper(componentModel = "spring")
public interface MaterialMapper {

    @Mapping(target = "materialId", source = "materialId")
    MaterialDTO toDTO(Material material);

    Material toEntity(MaterialDTO materialDTO);
}
