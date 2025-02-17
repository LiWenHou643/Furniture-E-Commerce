package com.example.application.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class Product extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long productId;

	@Column(nullable = false)
	String productName;

	String productDescription;

	@Builder.Default
	double averageRating = 0.0;

	@Builder.Default
	int ratingCount = 0;

	@Builder.Default
	int soldQuantity = 0;

	@Builder.Default
	boolean productStatus = true;

	@ManyToOne
	@JoinColumn(name = "category_id", nullable = false)
	Category category;

	@ManyToOne
	@JoinColumn(name = "brand_id", nullable = false)
	Brand brand;

	@ManyToOne
	@JoinColumn(name = "material_id", nullable = false)
	Material material;

	@ManyToMany(mappedBy = "products")
	@Builder.Default
	Set<Area> areas = new HashSet<>();

	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
	@Builder.Default
	Set<ProductItem> productItems = new HashSet<>();

}
