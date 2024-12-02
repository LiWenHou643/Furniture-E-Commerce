package com.example.application.service.product;

import com.example.application.entity.Category;
import com.example.application.repository.product.CategoryRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Service
public class CategoryService {

    CategoryRepository categoryRepository;

    public Category getCategoryById(Long categoryId) {
        return categoryRepository.findById(categoryId)
                                 .orElseThrow(() -> new RuntimeException("Category not found"));
    }
}