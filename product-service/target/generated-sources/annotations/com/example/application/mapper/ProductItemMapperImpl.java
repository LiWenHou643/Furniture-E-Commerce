package com.example.application.mapper;

import com.example.application.dto.ColorDTO;
import com.example.application.dto.ColorDTO.ColorDTOBuilder;
import com.example.application.dto.ProductDTO;
import com.example.application.dto.ProductDTO.ProductDTOBuilder;
import com.example.application.dto.ProductItemDTO;
import com.example.application.dto.ProductItemDTO.ProductItemDTOBuilder;
import com.example.application.entity.Color;
import com.example.application.entity.Color.ColorBuilder;
import com.example.application.entity.Product;
import com.example.application.entity.Product.ProductBuilder;
import com.example.application.entity.ProductItem;
import com.example.application.entity.ProductItem.ProductItemBuilder;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-12-23T00:23:34+0700",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 21.0.5 (Ubuntu)"
)
@Component
public class ProductItemMapperImpl implements ProductItemMapper {

    @Override
    public ProductItemDTO toDTO(ProductItem productItem) {
        if ( productItem == null ) {
            return null;
        }

        ProductItemDTOBuilder productItemDTO = ProductItemDTO.builder();

        productItemDTO.productItemId( productItem.getProductItemId() );
        productItemDTO.product( productToProductDTO( productItem.getProduct() ) );
        productItemDTO.color( colorToColorDTO( productItem.getColor() ) );
        productItemDTO.sku( productItem.getSku() );
        productItemDTO.quantity( productItem.getQuantity() );
        productItemDTO.originalPrice( productItem.getOriginalPrice() );
        productItemDTO.stockQuantity( productItem.getStockQuantity() );

        return productItemDTO.build();
    }

    @Override
    public ProductItem toEntity(ProductItemDTO productItemDTO) {
        if ( productItemDTO == null ) {
            return null;
        }

        ProductItemBuilder productItem = ProductItem.builder();

        productItem.productItemId( productItemDTO.getProductItemId() );
        productItem.product( productDTOToProduct( productItemDTO.getProduct() ) );
        productItem.color( colorDTOToColor( productItemDTO.getColor() ) );
        productItem.sku( productItemDTO.getSku() );
        productItem.originalPrice( productItemDTO.getOriginalPrice() );
        productItem.quantity( productItemDTO.getQuantity() );
        productItem.stockQuantity( productItemDTO.getStockQuantity() );

        return productItem.build();
    }

    protected ProductDTO productToProductDTO(Product product) {
        if ( product == null ) {
            return null;
        }

        ProductDTOBuilder productDTO = ProductDTO.builder();

        if ( product.getProductId() != null ) {
            productDTO.productId( Long.parseLong( product.getProductId() ) );
        }
        productDTO.productName( product.getProductName() );
        productDTO.productDescription( product.getProductDescription() );
        productDTO.averageRating( product.getAverageRating() );
        productDTO.ratingCount( product.getRatingCount() );
        productDTO.productStatus( product.isProductStatus() );

        return productDTO.build();
    }

    protected ColorDTO colorToColorDTO(Color color) {
        if ( color == null ) {
            return null;
        }

        ColorDTOBuilder colorDTO = ColorDTO.builder();

        colorDTO.colorId( color.getColorId() );
        colorDTO.colorName( color.getColorName() );
        colorDTO.hexCode( color.getHexCode() );

        return colorDTO.build();
    }

    protected Product productDTOToProduct(ProductDTO productDTO) {
        if ( productDTO == null ) {
            return null;
        }

        ProductBuilder product = Product.builder();

        if ( productDTO.getProductId() != null ) {
            product.productId( String.valueOf( productDTO.getProductId() ) );
        }
        product.productName( productDTO.getProductName() );
        product.productDescription( productDTO.getProductDescription() );
        product.averageRating( productDTO.getAverageRating() );
        product.ratingCount( productDTO.getRatingCount() );
        product.productStatus( productDTO.isProductStatus() );

        return product.build();
    }

    protected Color colorDTOToColor(ColorDTO colorDTO) {
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
