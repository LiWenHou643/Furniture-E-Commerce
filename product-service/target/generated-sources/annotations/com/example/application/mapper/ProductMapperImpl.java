package com.example.application.mapper;

import com.example.application.dto.CategoryDTO;
import com.example.application.dto.CategoryDTO.CategoryDTOBuilder;
import com.example.application.dto.ProductDTO;
import com.example.application.dto.ProductDTO.ProductDTOBuilder;
import com.example.application.entity.Category;
import com.example.application.entity.Product;
import com.example.application.entity.Product.ProductBuilder;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-12-23T00:23:35+0700",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 21.0.5 (Ubuntu)"
)
@Component
public class ProductMapperImpl implements ProductMapper {

    @Override
    public Product toProduct(ProductDTO productDTO) {
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

    @Override
    public ProductDTO toDTO(Product product) {
        if ( product == null ) {
            return null;
        }

        ProductDTOBuilder productDTO = ProductDTO.builder();

        productDTO.productCategory( categoryToCategoryDTO( product.getCategory() ) );
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

    @Override
    public void updateProductFromDto(ProductDTO productDTO, Product product) {
        if ( productDTO == null ) {
            return;
        }

        if ( productDTO.getProductId() != null ) {
            product.setProductId( String.valueOf( productDTO.getProductId() ) );
        }
        else {
            product.setProductId( null );
        }
        product.setProductName( productDTO.getProductName() );
        product.setProductDescription( productDTO.getProductDescription() );
        product.setAverageRating( productDTO.getAverageRating() );
        product.setRatingCount( productDTO.getRatingCount() );
        product.setProductStatus( productDTO.isProductStatus() );
    }

    protected CategoryDTO categoryToCategoryDTO(Category category) {
        if ( category == null ) {
            return null;
        }

        CategoryDTOBuilder categoryDTO = CategoryDTO.builder();

        categoryDTO.categoryId( category.getCategoryId() );
        categoryDTO.categoryName( category.getCategoryName() );
        categoryDTO.categoryDescription( category.getCategoryDescription() );

        return categoryDTO.build();
    }
}
