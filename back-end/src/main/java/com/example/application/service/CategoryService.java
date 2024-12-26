package com.example.application.service;

import com.example.application.dto.CategoryDTO;
import com.example.application.exception.ResourceNotFoundException;
import com.example.application.mapper.CategoryMapper;
import com.example.application.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class CategoryService {
    CategoryRepository categoryRepository;

    public List<CategoryDTO> getCategories() {
        return categoryRepository.findAll().stream()
                         .map(CategoryMapper.INSTANCE::toDTO)
                         .toList();
    }

    public CategoryDTO getCategoryById(Long id) {
        var category = categoryRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Category", "id", id)
        );
        return CategoryMapper.INSTANCE.toDTO(category);
    }

    public CategoryDTO addCategory(CategoryDTO categoryDTO) {
        var category = CategoryMapper.INSTANCE.toEntity(categoryDTO);
        categoryRepository.save(category);
        return CategoryMapper.INSTANCE.toDTO(category);
    }

    public CategoryDTO updateCategory(CategoryDTO categoryDTO) {
        var category = categoryRepository.findById(categoryDTO.getCategoryId()).orElseThrow(
                () -> new ResourceNotFoundException("Category", "id", categoryDTO.getCategoryId())
        );
        category.setCategoryName(categoryDTO.getCategoryName());
        category.setCategoryDescription(categoryDTO.getCategoryDescription());
        categoryRepository.save(category);
        return CategoryMapper.INSTANCE.toDTO(category);
    }
}
