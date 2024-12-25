package com.example.application.controller;

import com.example.application.dto.ProductDTO;
import com.example.application.dto.ApiResponse;
import com.example.application.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static lombok.AccessLevel.PRIVATE;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = PRIVATE, makeFinal = true)
@RequestMapping("/products")
public class ProductController {

    ProductService productService;

    @GetMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<ProductDTO>>> getProducts() {
        List<ProductDTO> items = productService.getProducts();
        return ResponseEntity.ok(new ApiResponse<>("success", "List products found", items));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> getItemById(@PathVariable Long id) {
        ProductDTO item = productService.getProduct(id);
        return ResponseEntity.ok(new ApiResponse<>("success", "Product found", item));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<ProductDTO>>> searchProducts(@RequestParam (name = "productName") String query) {
        List<ProductDTO> items = productService.searchProducts(query);
        return ResponseEntity.ok(new ApiResponse<>("success", "List products found", items));
    }

}
