package com.example.application.service;

import com.example.application.dto.CategoryDTO;
import com.example.application.exception.ResourceNotFoundException;
import com.example.application.mapper.CategoryMapper;
import com.example.application.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class CategoryService {
    private static final String CATEGORY_LIST_CACHE_KEY = "categoryList";
    private static final String CATEGORY_CACHE_KEY = "category";

    CategoryRepository categoryRepository;

    @Cacheable(cacheNames = CATEGORY_LIST_CACHE_KEY)
    public List<CategoryDTO> getCategories() {
        return categoryRepository.findAll().stream()
                                 .map(CategoryMapper.INSTANCE::toDTO)
                                 .collect(Collectors.toList());
    }

    @Cacheable(cacheNames = CATEGORY_CACHE_KEY, key = "#id")
    public CategoryDTO getCategoryById(Long id) {
        var category = categoryRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Category", "id", id)
        );
        return CategoryMapper.INSTANCE.toDTO(category);
    }

    @Caching(
            evict = {@CacheEvict(cacheNames = CATEGORY_LIST_CACHE_KEY, allEntries = true)},
            put = {@CachePut(cacheNames = CATEGORY_CACHE_KEY, key = "#result.categoryId")}
    )
    public CategoryDTO addOrUpdateCategory(CategoryDTO categoryDTO) {
        if (categoryDTO.getCategoryId() == null) {
            return CategoryMapper.INSTANCE.toDTO(categoryRepository.save(CategoryMapper.INSTANCE.toEntity(categoryDTO)));
        }

        var category = categoryRepository.findById(categoryDTO.getCategoryId()).orElseThrow(
                () -> new ResourceNotFoundException("Category", "id", categoryDTO.getCategoryId())
        );

        category.setCategoryName(categoryDTO.getCategoryName());
        category.setCategoryDescription(categoryDTO.getCategoryDescription());
        return CategoryMapper.INSTANCE.toDTO(categoryRepository.save(category));
    }

    @Caching(
            evict = {@CacheEvict(cacheNames = CATEGORY_LIST_CACHE_KEY, allEntries = true)}
    )
    public void deleteCategory(Long categoryId) {
        var category = categoryRepository.findById(categoryId).orElseThrow(
                () -> new ResourceNotFoundException("Category", "id", categoryId)
        );
        categoryRepository.delete(category);
    }

}
