package com.example.application.mapper;

import com.example.application.dto.ColorDTO;
import com.example.application.entity.Color;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ColorMapper {
    ColorMapper INSTANCE = Mappers.getMapper(ColorMapper.class);

    ColorDTO toDTO(Color color);

    Color toEntity(ColorDTO colorDTO);
}
