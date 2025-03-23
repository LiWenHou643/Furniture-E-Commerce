package com.example.application.dto;

import java.math.BigDecimal;

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
public class DescriptionDetailDTO {
	Long detailId;

	Long productId;

	String shortDescription;

	String style;

	String upholsteryMaterial;

	String frameMaterial;

	String cushionFilling;

	BigDecimal dimensionsLength;

	BigDecimal dimensionsWidth;

	BigDecimal dimensionsHeight;

	BigDecimal weight;

	BigDecimal weightCapacity;

	String features;

	Boolean ergonomicDesign;

	Boolean assemblyRequired;

	String careInstructions;

	String intendedUse;

	String durabilityRating;

}
