package com.example.application.mapper;

import com.example.application.dto.BrandDTO;
import com.example.application.dto.BrandDTO.BrandDTOBuilder;
import com.example.application.entity.Brand;
import com.example.application.entity.Brand.BrandBuilder;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-12-23T00:23:34+0700",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 21.0.5 (Ubuntu)"
)
@Component
public class BrandMapperImpl implements BrandMapper {

    @Override
    public BrandDTO toDTO(Brand brand) {
        if ( brand == null ) {
            return null;
        }

        BrandDTOBuilder brandDTO = BrandDTO.builder();

        brandDTO.brandId( brand.getBrandId() );
        brandDTO.brandName( brand.getBrandName() );
        brandDTO.brandDescription( brand.getBrandDescription() );

        return brandDTO.build();
    }

    @Override
    public Brand toEntity(BrandDTO brandDTO) {
        if ( brandDTO == null ) {
            return null;
        }

        BrandBuilder brand = Brand.builder();

        brand.brandId( brandDTO.getBrandId() );
        brand.brandName( brandDTO.getBrandName() );
        brand.brandDescription( brandDTO.getBrandDescription() );

        return brand.build();
    }
}
