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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "product_item")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ProductItem extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long productItemId;

	@ManyToOne
	@JoinColumn(name = "product_id", nullable = false)
	Product product;

	@OneToOne
	@JoinColumn(name = "color_id")
	Color color;

	@Column(unique = true, nullable = false)
	String sku;

	@Column(nullable = false)
	double originalPrice;

	@Column(nullable = false)
	double salePrice;

	@Column(nullable = false)
	int stockQuantity;

	@Builder.Default
	Boolean productItemStatus = true;

	@Builder.Default
	@OneToMany(mappedBy = "productItem", cascade = CascadeType.ALL, orphanRemoval = true)
	Set<ProductImage> productImages = new HashSet<>();

	@Builder.Default
	@OneToMany(mappedBy = "productItem", cascade = CascadeType.ALL, orphanRemoval = true)
	Set<Feedback> feedbacks = new HashSet<>();
}
