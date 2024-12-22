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
@RequestMapping("/products")
public class ProductController {

    ProductService productService;

    @GetMapping("")
    public ResponseEntity<ApiResponse<List<ProductDTO>>> getProducts() {
        List<ProductDTO> items = productService.getProducts();
        ApiResponse<List<ProductDTO>> response = ApiResponse.<List<ProductDTO>>builder()
                .status("success")
                .message("List products found")
                .data(items)
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductDTO>> getItemById(@PathVariable Long id) {
        ProductDTO item = productService.getProduct(id);
        ApiResponse<ProductDTO> response = ApiResponse.<ProductDTO>builder().message("Product found").data(item).build();
        return ResponseEntity.ok(response);
    }

}
