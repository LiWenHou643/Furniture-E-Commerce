package com.example.application.mapper;

import com.example.application.dto.ProductImageDTO;
import com.example.application.dto.ProductImageDTO.ProductImageDTOBuilder;
import com.example.application.entity.ProductImage;
import com.example.application.entity.ProductImage.ProductImageBuilder;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-12-23T00:23:35+0700",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 21.0.5 (Ubuntu)"
)
@Component
public class ProductImageMapperImpl implements ProductImageMapper {

    @Override
    public ProductImageDTO toDTO(ProductImage productImage) {
        if ( productImage == null ) {
            return null;
        }

        ProductImageDTOBuilder productImageDTO = ProductImageDTO.builder();

        if ( productImage.getImageId() != null ) {
            productImageDTO.imageId( Long.parseLong( productImage.getImageId() ) );
        }
        productImageDTO.imageUrl( productImage.getImageUrl() );

        return productImageDTO.build();
    }

    @Override
    public ProductImage toProductImage(ProductImageDTO productImageDTO) {
        if ( productImageDTO == null ) {
            return null;
        }

        ProductImageBuilder productImage = ProductImage.builder();

        if ( productImageDTO.getImageId() != null ) {
            productImage.imageId( String.valueOf( productImageDTO.getImageId() ) );
        }
        productImage.imageUrl( productImageDTO.getImageUrl() );

        return productImage.build();
    }
}
