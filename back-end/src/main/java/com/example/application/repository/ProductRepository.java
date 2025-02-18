package com.example.application.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.application.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
	List<Product> findByProductNameContaining(String query);

	List<Product> findTop10ByOrderBySoldQuantityDesc();

	@Query("SELECT p FROM Product p JOIN p.category c WHERE  :categories IS NULL OR c.categoryName IN :categories")
	List<Product> findProductByCategory(List<String> categories);

	@Query("SELECT DISTINCT p FROM Product p " + "JOIN p.productItems v "
			+ "WHERE (:categories IS NULL OR p.category.categoryId IN :categories) "
			+ "AND (:brands IS NULL OR p.brand.brandId IN :brands) "
			+ "AND (:materials IS NULL OR p.material.materialId IN :materials) "
			+ "AND (:minPrice IS NULL OR v.salePrice >= :minPrice) "
			+ "AND (:maxPrice IS NULL OR v.salePrice <= :maxPrice)"
			+ "AND (:minRating IS NULL OR p.averageRating >= :minRating)" + "AND p.productStatus = true")
	List<Product> findFilteredProductsWithVariations(@Param("categories") List<String> categories,
			@Param("brands") List<String> brands, @Param("materials") List<String> materials,
			@Param("minPrice") Double minPrice, @Param("maxPrice") Double maxPrice,
			@Param("minRating") Integer minRating);

	@Query("SELECT p FROM Product p " + "LEFT JOIN FETCH p.productItems pi " + "LEFT JOIN FETCH pi.feedbacks f "
			+ "WHERE p.productId = :productId")
	Optional<Product> findByIdWithProductItemsAndFeedbacks(@Param("productId") Long productId);
}
