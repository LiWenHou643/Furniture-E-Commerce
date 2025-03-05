package com.example.application.controller;

import static lombok.AccessLevel.PRIVATE;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.application.dto.ApiResponse;
import com.example.application.dto.ProductDTO;
import com.example.application.service.ProductService;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = PRIVATE, makeFinal = true)
@RequestMapping("/products")
public class ProductController {

	ProductService productService;

	@GetMapping
	public ResponseEntity<ApiResponse<Page<ProductDTO>>> getProducts(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "12") int size, @RequestParam(required = false) String categories,
			@RequestParam(required = false) String brands, @RequestParam(required = false) String materials,
			@RequestParam(required = false) Double minPrice, @RequestParam(required = false) Double maxPrice,
			@RequestParam(required = false) Integer minRating, @RequestParam(required = false) String keyword) {
		Pageable pageable = PageRequest.of(page, size);

		// Parse comma-separated strings into lists
		List<String> categoryList = categories != null ? Arrays.asList(categories.split(",")) : null;
		List<String> brandList = brands != null ? Arrays.asList(brands.split(",")) : null;
		List<String> materialList = materials != null ? Arrays.asList(materials.split(",")) : null;

		// Pass filtering parameters to the service
		Page<ProductDTO> products = productService.getProducts(categoryList, brandList, materialList, minPrice,
				maxPrice, minRating, keyword, pageable);

		return ResponseEntity.ok(ApiResponse.<Page<ProductDTO>>builder().status("success")
				.message("List products found").data(products).build());
	}

	@GetMapping("/{id}")
	public ResponseEntity<ApiResponse<ProductDTO>> getItemById(@PathVariable Long id) {
		return ResponseEntity.ok(ApiResponse.<ProductDTO>builder().status("success").message("Product found")
				.data(productService.getProductById(id)).build());
	}

	@PostMapping
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ApiResponse<ProductDTO>> addProduct(@ModelAttribute ProductDTO productDTO)
			throws IOException {
		return ResponseEntity.ok(ApiResponse.<ProductDTO>builder().status("success")
				.message("Product added successfully").data(productService.addProduct(productDTO)).build());
	}

	@PutMapping
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ApiResponse<ProductDTO>> updateProduct(@RequestBody ProductDTO productDTO) {
		return ResponseEntity.ok(ApiResponse.<ProductDTO>builder().status("success").message("Product updated")
				.data(productService.updateProduct(productDTO)).build());
	}

	@GetMapping("/top-sales")
	public ResponseEntity<ApiResponse<List<ProductDTO>>> getTopSalesProducts() {
		return ResponseEntity.ok(ApiResponse.<List<ProductDTO>>builder().status("success")
				.message("Top feature products found").data(productService.getTopSalesProducts()).build());
	}

	@GetMapping("/total-sold")
	public ResponseEntity<ApiResponse<Integer>> getTotalSold() {
		return ResponseEntity.ok(ApiResponse.<Integer>builder().status("success").message("Total sales found")
				.data(productService.getTotalSold()).build());
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ApiResponse<?>> deleteProduct(@PathVariable Long id) {
		productService.deleteProduct(id);
		return ResponseEntity
				.ok(ApiResponse.<ProductDTO>builder().status("success").message("Product deleted").build());
	}
}
