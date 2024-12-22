package com.example.application.mapper;

import com.example.application.dto.ColorDTO;
import com.example.application.dto.ColorDTO.ColorDTOBuilder;
import com.example.application.entity.Color;
import com.example.application.entity.Color.ColorBuilder;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-12-23T00:23:35+0700",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 21.0.5 (Ubuntu)"
)
@Component
public class ColorMapperImpl implements ColorMapper {

    @Override
    public ColorDTO toDTO(Color color) {
        if ( color == null ) {
            return null;
        }

        ColorDTOBuilder colorDTO = ColorDTO.builder();

        colorDTO.colorId( color.getColorId() );
        colorDTO.colorName( color.getColorName() );
        colorDTO.hexCode( color.getHexCode() );

        return colorDTO.build();
    }

    @Override
    public Color toEntity(ColorDTO colorDTO) {
        if ( colorDTO == null ) {
            return null;
        }

        ColorBuilder color = Color.builder();

        color.colorId( colorDTO.getColorId() );
        color.colorName( colorDTO.getColorName() );
        color.hexCode( colorDTO.getHexCode() );

        return color.build();
    }
}
