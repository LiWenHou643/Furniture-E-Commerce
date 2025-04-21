package com.example.application.mapper;

import org.mapstruct.Mapper;

import com.example.application.dto.ColorDTO;
import com.example.application.entity.Color;

@Mapper(componentModel = "spring")
public interface ColorMapper {
    ColorDTO toDTO(Color color);

    Color toEntity(ColorDTO colorDTO);
}
