package com.example.application.controller;

import com.example.application.dto.ApiResponse;
import com.example.application.dto.CategoryDTO;
import com.example.application.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class CategoryController {
    CategoryService categoryService;

    @GetMapping("/categories")
    public ResponseEntity<ApiResponse<List<CategoryDTO>>> getCategories() {
        var categories = categoryService.getCategories();
        return ResponseEntity.ok(new ApiResponse<>("success", "List categories found", categories));
    }
}
