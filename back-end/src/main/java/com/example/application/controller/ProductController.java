package com.example.application.controller;

import com.example.application.dto.ApiResponse;
import com.example.application.dto.ProductDTO;
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
public class ProductController {

    ProductService productService;

    @GetMapping("/products")
    public ResponseEntity<ApiResponse<List<ProductDTO>>> getProducts() {
        return ResponseEntity.ok(
                ApiResponse.<List<ProductDTO>>builder()
                           .status("success")
                           .message("List products found")
                           .data(productService.getProducts())
                           .build()
        );
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<ApiResponse<ProductDTO>> getItemById(@PathVariable Long id) {
        return ResponseEntity.ok(
                ApiResponse.<ProductDTO>builder()
                           .status("success")
                           .message("Product found")
                           .data(productService.getProductById(id))
                           .build()
        );
    }

    @GetMapping("/products/search")
    public ResponseEntity<ApiResponse<List<ProductDTO>>> searchProducts(@RequestParam(name = "productName") String query) {
        return ResponseEntity.ok(
                ApiResponse.<List<ProductDTO>>builder()
                           .status("success")
                           .message("Products found by query: " + query)
                           .data(productService.searchProducts(query))
                           .build()
        );
    }

    @PostMapping("/products")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ProductDTO>> addProduct(@RequestBody ProductDTO productDTO) {
        return ResponseEntity.ok(
                ApiResponse.<ProductDTO>builder()
                           .status("success")
                           .message("Product added")
                           .data(productService.addProduct(productDTO))
                           .build()
        );
    }

    @PutMapping("/products")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ProductDTO>> updateProduct(@RequestBody ProductDTO productDTO) {
        return ResponseEntity.ok(
                ApiResponse.<ProductDTO>builder()
                           .status("success")
                           .message("Product updated")
                           .data(productService.updateProduct(productDTO))
                           .build()
        );
    }

}
