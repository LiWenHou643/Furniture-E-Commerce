package com.example.application.entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Builder
@Table(name = "description_detail") // Matches MySQL table name
public class DescriptionDetail {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incrementing ID
	Long detailId;

	@OneToOne
	@JoinColumn(name = "product_id", nullable = false) // Foreign key to Product table
	Product product;

	@Column(name = "short_description", columnDefinition = "TEXT")
	String shortDescription;

	@Column(name = "style", length = 100)
	String style;

	@Column(name = "upholstery_material", length = 100)
	String upholsteryMaterial;

	@Column(name = "frame_material", length = 100)
	String frameMaterial;

	@Column(name = "cushion_filling", length = 100)
	String cushionFilling;

	@Column(name = "dimensions_length", precision = 10, scale = 2)
	BigDecimal dimensionsLength;

	@Column(name = "dimensions_width", precision = 10, scale = 2)
	BigDecimal dimensionsWidth;

	@Column(name = "dimensions_height", precision = 10, scale = 2)
	BigDecimal dimensionsHeight;

	@Column(name = "weight", precision = 10, scale = 2)
	BigDecimal weight;

	@Column(name = "weight_capacity", precision = 10, scale = 2)
	BigDecimal weightCapacity;

	@Column(name = "features", columnDefinition = "TEXT")
	String features;

	@Column(name = "ergonomic_design")
	Boolean ergonomicDesign;

	@Column(name = "assembly_required")
	Boolean assemblyRequired;

	@Column(name = "care_instructions", columnDefinition = "TEXT")
	String careInstructions;

	@Column(name = "intended_use", length = 100)
	String intendedUse;

	@Column(name = "durability_rating", length = 50)
	String durabilityRating;

}