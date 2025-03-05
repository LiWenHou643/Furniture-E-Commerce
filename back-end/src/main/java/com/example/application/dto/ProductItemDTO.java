package com.example.application.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductItemDTO {
	Long productItemId;
	Long productId;
	String productName;
	ColorDTO color;
	String sku;
	double originalPrice;
	double salePrice;
	int stockQuantity;
	boolean productItemStatus;
	List<ProductImageDTO> productImages;

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	List<ProductImageDTO> newProductImages;
}