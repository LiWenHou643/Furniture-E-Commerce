package com.example.application.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;

import com.example.application.dto.CategoryDTO;
import com.example.application.exception.ResourceNotFoundException;
import com.example.application.mapper.CategoryMapper;
import com.example.application.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class CategoryService {
    private static final String CATEGORY_LIST_CACHE_KEY = "categoryList";
    private static final String CATEGORY_CACHE_KEY = "category";

    CategoryRepository categoryRepository;
    CategoryMapper categoryMapper;

    @Cacheable(cacheNames = CATEGORY_LIST_CACHE_KEY)
    public List<CategoryDTO> getCategories() {
        return categoryRepository.findAll().stream()
                                 .map(categoryMapper::toDTO)
                                 .collect(Collectors.toList());
    }

    @Cacheable(cacheNames = CATEGORY_CACHE_KEY, key = "#id")
    public CategoryDTO getCategoryById(Long id) {
        var category = categoryRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Category", "id", id)
        );
        return categoryMapper.toDTO(category);
    }

    @Caching(
            evict = {@CacheEvict(cacheNames = CATEGORY_LIST_CACHE_KEY, allEntries = true)},
            put = {@CachePut(cacheNames = CATEGORY_CACHE_KEY, key = "#result.categoryId")}
    )
    public CategoryDTO addOrUpdateCategory(CategoryDTO categoryDTO) {
        if (categoryDTO.getCategoryId() == null) {
            return categoryMapper.toDTO(categoryRepository.save(categoryMapper.toEntity(categoryDTO)));
        }

        var category = categoryRepository.findById(categoryDTO.getCategoryId()).orElseThrow(
                () -> new ResourceNotFoundException("Category", "id", categoryDTO.getCategoryId())
        );

        category.setCategoryName(categoryDTO.getCategoryName());
        category.setCategoryDescription(categoryDTO.getCategoryDescription());
        return categoryMapper.toDTO(categoryRepository.save(category));
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
