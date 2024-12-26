package com.example.application.service;

import com.example.application.dto.CategoryDTO;
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
}
