package com.example.application.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
import com.example.application.dto.ProductItemDTO;
import com.example.application.service.ProductItemService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/products")
public class ProductItemController {
	ProductItemService productItemService;

	@GetMapping("/product-items/{id}")
	public ResponseEntity<ApiResponse<ProductItemDTO>> getProductItemById(@PathVariable Long id) {
		return ResponseEntity.ok(
				ApiResponse.<ProductItemDTO>builder().status("success").message("Product item retrieved successfully")
						.data(productItemService.getProductItemById(id)).build());
	}

	@GetMapping("/product-items")
	public ResponseEntity<ApiResponse<Iterable<ProductItemDTO>>> getAllProductItemsByIds(
			@RequestParam List<Long> productItemIds) {
		return ResponseEntity.ok(ApiResponse.<Iterable<ProductItemDTO>>builder().status("success")
				.message("Product items retrieved successfully")
				.data(productItemService.getAllProductItemsByIds(productItemIds)).build());
	}

	@PostMapping("/product-items")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ApiResponse<ProductItemDTO>> addProductItem(@ModelAttribute ProductItemDTO productItemDTO)
			throws IOException {
		return ResponseEntity
				.ok(ApiResponse.<ProductItemDTO>builder().status("success").message("Product item added successfully")
						.data(productItemService.addProductItem(productItemDTO)).build());
	}

	@PutMapping("/product-items")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ApiResponse<ProductItemDTO>> updateProductItem(@RequestBody ProductItemDTO productItemDTO) {
		return ResponseEntity
				.ok(ApiResponse.<ProductItemDTO>builder().status("success").message("Product item updated successfully")
						.data(productItemService.updateProductItem(productItemDTO)).build());
	}

}
