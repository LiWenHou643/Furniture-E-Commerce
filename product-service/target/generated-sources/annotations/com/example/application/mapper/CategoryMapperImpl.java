package com.example.application.mapper;

import com.example.application.dto.CategoryDTO;
import com.example.application.dto.CategoryDTO.CategoryDTOBuilder;
import com.example.application.entity.Category;
import com.example.application.entity.Category.CategoryBuilder;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-12-23T00:23:34+0700",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 21.0.5 (Ubuntu)"
)
@Component
public class CategoryMapperImpl implements CategoryMapper {

    @Override
    public CategoryDTO toDTO(Category category) {
        if ( category == null ) {
            return null;
        }

        CategoryDTOBuilder categoryDTO = CategoryDTO.builder();

        categoryDTO.categoryId( category.getCategoryId() );
        categoryDTO.categoryName( category.getCategoryName() );
        categoryDTO.categoryDescription( category.getCategoryDescription() );

        return categoryDTO.build();
    }

    @Override
    public Category toCategory(CategoryDTO categoryDTO) {
        if ( categoryDTO == null ) {
            return null;
        }

        CategoryBuilder category = Category.builder();

        category.categoryId( categoryDTO.getCategoryId() );
        category.categoryName( categoryDTO.getCategoryName() );
        category.categoryDescription( categoryDTO.getCategoryDescription() );

        return category.build();
    }
}
