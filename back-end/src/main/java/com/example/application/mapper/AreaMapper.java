package com.example.application.mapper;

import com.example.application.dto.AreaDTO;
import com.example.application.entity.Area;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface AreaMapper {
    AreaMapper INSTANCE = Mappers.getMapper(AreaMapper.class);

    AreaDTO toDTO(Area area);

    Area toEntity(AreaDTO areaDTO);
}
