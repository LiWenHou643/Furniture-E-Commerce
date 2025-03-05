package com.example.application.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.application.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

	List<Product> findByProductNameContainingAndProductStatusTrue(String query);

	@Query("""
			SELECT p FROM Product p
			JOIN FETCH p.productItems v
			WHERE p.id = :id
			AND p.productStatus = true
			AND v.productItemStatus = true
			""")
	Optional<Product> findByIdAndProductStatusTrue(Long id);

	@Query("""
			SELECT p FROM Product p
			WHERE p.soldQuantity > 0
			AND p.productStatus = true
			ORDER BY p.soldQuantity DESC
			LIMIT 3
			""")
	List<Product> findTop3BySoldQuantityGreaterThanZero();

	@Query("""
			SELECT p FROM Product p
			JOIN FETCH p.productItems v
			JOIN p.category c
			WHERE
				(:categories IS NULL OR c.categoryName IN :categories)
				AND p.productStatus = true
				AND v.productItemStatus = true
			""")
	List<Product> findProductByCategory(List<String> categories);

	@Query("""
			SELECT DISTINCT p FROM Product p JOIN FETCH p.productItems v
			WHERE (:categories IS NULL OR p.category.categoryId IN :categories)
			AND (:brands IS NULL OR p.brand.brandId IN :brands)
			AND (:materials IS NULL OR p.material.materialId IN :materials)
			AND (:minPrice IS NULL OR v.salePrice >= :minPrice)
			AND (:maxPrice IS NULL OR v.salePrice <= :maxPrice)
			AND (:minRating IS NULL OR p.averageRating >= :minRating)
			AND p.productStatus = true
			AND v.productItemStatus = true
			""")
	List<Product> findFilteredProductsWithVariations(@Param("categories") List<String> categories,
			@Param("brands") List<String> brands, @Param("materials") List<String> materials,
			@Param("minPrice") Double minPrice, @Param("maxPrice") Double maxPrice,
			@Param("minRating") Integer minRating);

	@Query("SELECT SUM(p.soldQuantity) FROM Product p")
	int findTotalSold();
}
