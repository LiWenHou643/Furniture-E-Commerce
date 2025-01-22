package com.example.application.controller;

import com.example.application.dto.ApiResponse;
import com.example.application.dto.ProductDTO;
import com.example.application.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

import static lombok.AccessLevel.PRIVATE;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = PRIVATE, makeFinal = true)
public class ProductController {

    ProductService productService;

    @GetMapping("/products")
    public ResponseEntity<ApiResponse<Page<ProductDTO>>> getProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(required = false, name = "categories") String categories,
            @RequestParam(required = false) String brands,
            @RequestParam(required = false) String materials,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) Integer minRating,
            @RequestParam(required = false) String keyword
    ) {
        Pageable pageable = PageRequest.of(page, size);

        // Parse comma-separated strings into lists
        List<String> categoryList = categories != null ? Arrays.asList(categories.split(",")) : null;
        List<String> brandList = brands != null ? Arrays.asList(brands.split(",")) : null;
        List<String> materialList = materials != null ? Arrays.asList(materials.split(",")) : null;

        // Pass filtering parameters to the service
        Page<ProductDTO> products = productService.getProducts(categoryList, brandList, materialList, minPrice, maxPrice, minRating, keyword,pageable);

        return ResponseEntity.ok(
                ApiResponse.<Page<ProductDTO>>builder()
                           .status("success")
                           .message("List products found")
                           .data(products)
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

    @GetMapping("/products/top-feature")
    public ResponseEntity<ApiResponse<List<ProductDTO>>> getTopFeatureProducts() {
        return ResponseEntity.ok(
                ApiResponse.<List<ProductDTO>>builder()
                           .status("success")
                           .message("Top feature products found")
                           .data(productService.getTopFeatureProducts())
                           .build()
        );
    }

}
