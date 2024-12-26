package com.example.application.controller;

import com.example.application.dto.ApiResponse;
import com.example.application.dto.CategoryDTO;
import com.example.application.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class CategoryController {
    CategoryService categoryService;

    @GetMapping("/categories")
    public ResponseEntity<ApiResponse<List<CategoryDTO>>> getCategories() {
        return ResponseEntity.ok(
                ApiResponse.<List<CategoryDTO>>builder()
                           .status("success")
                           .message("Categories found")
                           .data(categoryService.getCategories())
                           .build()
        );
    }

    @GetMapping("/categories/{id}")
    public ResponseEntity<ApiResponse<CategoryDTO>> getCategoryById(@PathVariable Long id) {
        return ResponseEntity.ok(
                ApiResponse.<CategoryDTO>builder()
                           .status("success")
                           .message("Category found")
                           .data(categoryService.getCategoryById(id))
                           .build()
        );
    }

    @PostMapping("/add-category")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<CategoryDTO>> addCategory(CategoryDTO categoryDTO) {
        return ResponseEntity.ok(
                ApiResponse.<CategoryDTO>builder()
                           .status("success")
                           .message("Category added")
                           .data(categoryService.addCategory(categoryDTO))
                           .build()
        );
    }

    @PutMapping("/update-category")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<CategoryDTO>> updateCategory(CategoryDTO categoryDTO) {
        return ResponseEntity.ok(
                ApiResponse.<CategoryDTO>builder()
                           .status("success")
                           .message("Category updated")
                           .data(categoryService.updateCategory(categoryDTO))
                           .build()
        );
    }
}
