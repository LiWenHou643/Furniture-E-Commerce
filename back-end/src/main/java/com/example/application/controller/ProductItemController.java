package com.example.application.controller;

import com.example.application.dto.ApiResponse;
import com.example.application.dto.ProductItemDTO;
import com.example.application.service.ProductItemService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/products")
public class ProductItemController {
    ProductItemService productItemService;

    @GetMapping("/product-items/{id}")
    public ResponseEntity<ApiResponse<ProductItemDTO>> getProductItemById(@PathVariable Long id) {
        return ResponseEntity.ok(
                ApiResponse.<ProductItemDTO>builder()
                           .status("success")
                           .message("Product item retrieved successfully")
                           .data(productItemService.getProductItemById(id))
                           .build()
        );
    }

    @PostMapping("/product-items")
    public ResponseEntity<ApiResponse<ProductItemDTO>> addProductItem(@RequestBody ProductItemDTO productItemDTO) {
        return ResponseEntity.ok(
                ApiResponse.<ProductItemDTO>builder()
                           .status("success")
                           .message("Product item added successfully")
                           .data(productItemService.addProductItem(productItemDTO))
                           .build()
        );
    }

    @PutMapping("/product-items")
    public ResponseEntity<ApiResponse<ProductItemDTO>> updateProductItem(@RequestBody ProductItemDTO productItemDTO) {
        return ResponseEntity.ok(
                ApiResponse.<ProductItemDTO>builder()
                           .status("success")
                           .message("Product item updated successfully")
                           .data(productItemService.updateProductItem(productItemDTO))
                           .build()
        );
    }

}
