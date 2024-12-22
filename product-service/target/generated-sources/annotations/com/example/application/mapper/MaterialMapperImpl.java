package com.example.application.mapper;

import com.example.application.dto.MaterialDTO;
import com.example.application.dto.MaterialDTO.MaterialDTOBuilder;
import com.example.application.entity.Material;
import com.example.application.entity.Material.MaterialBuilder;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-12-23T00:23:35+0700",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 21.0.5 (Ubuntu)"
)
@Component
public class MaterialMapperImpl implements MaterialMapper {

    @Override
    public MaterialDTO toDTO(Material material) {
        if ( material == null ) {
            return null;
        }

        MaterialDTOBuilder materialDTO = MaterialDTO.builder();

        if ( material.getMaterialId() != null ) {
            materialDTO.materialId( Long.parseLong( material.getMaterialId() ) );
        }
        materialDTO.materialName( material.getMaterialName() );
        materialDTO.materialDescription( material.getMaterialDescription() );

        return materialDTO.build();
    }

    @Override
    public Material toEntity(MaterialDTO materialDTO) {
        if ( materialDTO == null ) {
            return null;
        }

        MaterialBuilder material = Material.builder();

        if ( materialDTO.getMaterialId() != null ) {
            material.materialId( String.valueOf( materialDTO.getMaterialId() ) );
        }
        material.materialName( materialDTO.getMaterialName() );
        material.materialDescription( materialDTO.getMaterialDescription() );

        return material.build();
    }
}
