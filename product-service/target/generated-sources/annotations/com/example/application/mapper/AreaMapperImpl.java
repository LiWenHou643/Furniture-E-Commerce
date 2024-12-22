package com.example.application.mapper;

import com.example.application.dto.AreaDTO;
import com.example.application.dto.AreaDTO.AreaDTOBuilder;
import com.example.application.entity.Area;
import com.example.application.entity.Area.AreaBuilder;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-12-23T00:23:34+0700",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 21.0.5 (Ubuntu)"
)
@Component
public class AreaMapperImpl implements AreaMapper {

    @Override
    public AreaDTO toDTO(Area area) {
        if ( area == null ) {
            return null;
        }

        AreaDTOBuilder areaDTO = AreaDTO.builder();

        areaDTO.areaId( area.getAreaId() );
        areaDTO.areaName( area.getAreaName() );

        return areaDTO.build();
    }

    @Override
    public Area toEntity(AreaDTO areaDTO) {
        if ( areaDTO == null ) {
            return null;
        }

        AreaBuilder area = Area.builder();

        area.areaId( areaDTO.getAreaId() );
        area.areaName( areaDTO.getAreaName() );

        return area.build();
    }
}
