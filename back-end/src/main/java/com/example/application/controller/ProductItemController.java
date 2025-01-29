package com.example.application.controller;

import com.example.application.dto.ApiResponse;
import com.example.application.dto.ProductItemDTO;
import com.example.application.service.ProductItemService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

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

    @GetMapping("/product-items")
    public ResponseEntity<ApiResponse<Iterable<ProductItemDTO>>> getAllProductItemsByIds(
            @RequestParam("productItemIds") List<Long> productItemIds) {
        return ResponseEntity.ok(
                ApiResponse.<Iterable<ProductItemDTO>>builder()
                           .status("success")
                           .message("Product items retrieved successfully")
                           .data(productItemService.getAllProductItemsByIds(productItemIds))
                           .build()
        );
    }


    @PostMapping("/product-items")
    public ResponseEntity<ApiResponse<ProductItemDTO>> addProductItem(@ModelAttribute ProductItemDTO productItemDTO) throws IOException {
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
