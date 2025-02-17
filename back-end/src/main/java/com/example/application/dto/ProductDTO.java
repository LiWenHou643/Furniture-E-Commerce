package com.example.application.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

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
public class ProductDTO {
	Long productId;
	String productName;
	String productDescription;
	CategoryDTO category;
	BrandDTO brand;
	MaterialDTO material;
	List<AreaDTO> areas;
	List<ProductItemDTO> productItems;
	List<FeedbackDTO> feedbacks;
	double averageRating;
	int soldQuantity;
	int ratingCount;
	@Builder.Default
	boolean productStatus = true;

	Long categoryId;
	Long brandId;
	Long materialId;
}
