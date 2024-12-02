package com.example.application.controller;

import com.example.application.dto.response.ApiResponse;
import com.example.application.dto.response.ProductResponse;
import com.example.application.service.product.ProductService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@RequestMapping("/public/products")
public class ProductController {
    ProductService productService;

    @GetMapping
    public ApiResponse<Page<ProductResponse>> getProducts(
            @RequestParam(name = "category", required = false) String category,
            @RequestParam(name = "sort", defaultValue = "title-asc") String sort,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size) {

        var response = productService.getProducts(category, page, size, sort);
        return ApiResponse.<Page<ProductResponse>>builder().data(response).build();
    }

    @GetMapping("/best-seller")
    public ApiResponse<Page<ProductResponse>> getBestSellerProducts(@RequestParam(name = "limit", defaultValue = "12") int limit) {
        var response = productService.getBestSellerProducts(limit);
        return ApiResponse.<Page<ProductResponse>>builder().data(response).build();
    }

    @GetMapping("/most-discount")
    public ApiResponse<Page<ProductResponse>> getMostDiscountProducts(@RequestParam(name = "limit", defaultValue = "12") int limit) {
        var response = productService.getMostDiscountProducts(limit);
        return ApiResponse.<Page<ProductResponse>>builder().data(response).build();
    }

    @GetMapping("/search")
    public ApiResponse<List<ProductResponse>> searchProducts(@RequestParam(name = "title", required = false) String title) {
        var response = productService.searchProducts(title);
        return ApiResponse.<List<ProductResponse>>builder().data(response).build();
    }

    @GetMapping("/{productId}")
    public ApiResponse<ProductResponse> getProductById(@PathVariable Long productId) {
        var response = productService.getProductById(productId);
        return ApiResponse.<ProductResponse>builder().data(response).build();
    }
}