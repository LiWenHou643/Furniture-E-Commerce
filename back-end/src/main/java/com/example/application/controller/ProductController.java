package com.example.application.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.application.dto.ApiResponse;
import com.example.application.dto.ProductDTO;
import com.example.application.dto.ProductImageDTO;
import com.example.application.dto.ProductItemDTO;
import com.example.application.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import static lombok.AccessLevel.PRIVATE;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = PRIVATE, makeFinal = true)
public class ProductController {

    ProductService productService;
    Cloudinary cloudinary;

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
        Page<ProductDTO> products = productService.getProducts(categoryList, brandList, materialList, minPrice,
                maxPrice, minRating, keyword, pageable);

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

    @PostMapping("/products")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ProductDTO>> addProduct(@ModelAttribute ProductDTO productDTO) throws IOException {
        // Upload images to Cloudinary and update productDTO with secure URLs
        for (ProductItemDTO productItem : productDTO.getProductItems()) {
            for (ProductImageDTO productImage : productItem.getProductImages()) {
                if (productImage.getFile() != null) {
                    var uploadResult = cloudinary.uploader().upload(
                            productImage.getFile().getBytes(),
                            ObjectUtils.asMap("folder", "Products/")
                    );

                    String secureUrl = (String) uploadResult.get("secure_url");
                    productImage.setImageId(null); // Remove image ID
                    productImage.setImageUrl(secureUrl); // Replace file with URL
                    productImage.setFile(null); // Remove file data to avoid sending it further
                }
            }
        }

        // Save the product with updated URLs
        ProductDTO savedProduct = productService.addProduct(productDTO);

        return ResponseEntity.ok(
                ApiResponse.<ProductDTO>builder()
                           .status("success")
                           .message("Product added successfully")
                           .data(savedProduct)
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

    @DeleteMapping("/products/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<?>> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok(
                ApiResponse.<ProductDTO>builder()
                           .status("success")
                           .message("Product deleted")
                           .build()
        );
    }
}
