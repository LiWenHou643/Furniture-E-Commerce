package com.example.application.controller;

import java.beans.PropertyEditorSupport;
import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.application.dto.ApiResponse;
import com.example.application.dto.ColorDTO;
import com.example.application.dto.ProductItemDTO;
import com.example.application.service.ProductItemService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/products")
public class ProductItemController {
	ProductItemService productItemService;

	@InitBinder
	protected void initBinder(WebDataBinder binder) {
		binder.registerCustomEditor(ColorDTO.class, new PropertyEditorSupport() {
			@Override
			public void setAsText(String text) {
				ObjectMapper objectMapper = new ObjectMapper();
				try {
					setValue(objectMapper.readValue(text, ColorDTO.class)); // Convert JSON to ColorDTO
				} catch (JsonProcessingException e) {
					throw new IllegalArgumentException("Invalid JSON format for ColorDTO", e);
				}
			}
		});
	}

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
	public ResponseEntity<ApiResponse<ProductItemDTO>> updateProductItem(@ModelAttribute ProductItemDTO productItemDTO)
			throws IOException {
		return ResponseEntity
				.ok(ApiResponse.<ProductItemDTO>builder().status("success").message("Product item updated successfully")
						.data(productItemService.updateProductItem(productItemDTO)).build());
	}

	@DeleteMapping("/product-items/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ApiResponse<ProductItemDTO>> deleteProductItem(@PathVariable Long id) {
		productItemService.deleteProductItem(id);
		return ResponseEntity.ok(ApiResponse.<ProductItemDTO>builder().status("success")
				.message("Product item deleted successfully").build());
	}

}
