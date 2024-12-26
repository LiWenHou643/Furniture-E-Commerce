package com.example.application.controller;

import com.example.application.dto.ApiResponse;
import com.example.application.dto.ProductDTO;
import com.example.application.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
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
        List<ProductDTO> items = productService.getProducts();
        return ResponseEntity.ok(new ApiResponse<>("success", "List products found", items));
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<ApiResponse<ProductDTO>> getItemById(@PathVariable Long id) {
        ProductDTO item = productService.getProduct(id);
        return ResponseEntity.ok(new ApiResponse<>("success", "Product found", item));
    }

    @GetMapping("/products/search")
    public ResponseEntity<ApiResponse<List<ProductDTO>>> searchProducts(@RequestParam (name = "productName") String query) {
        List<ProductDTO> items = productService.searchProducts(query);
        return ResponseEntity.ok(new ApiResponse<>("success", "List products found", items));
    }

    @PostMapping("/add-product")
    public ResponseEntity<ApiResponse<ProductDTO>> addProduct(@RequestBody ProductDTO productDTO) {
        var response = productService.addProduct(productDTO);
        return ResponseEntity.ok(new ApiResponse<>("success", "Product added", response));
    }

}
