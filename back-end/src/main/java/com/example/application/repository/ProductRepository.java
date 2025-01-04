package com.example.application.repository;

import com.example.application.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<List<Product>> findByProductNameContaining(String query);

    @Query(value = "SELECT * FROM products LIMIT 20", nativeQuery = true)
    Optional<List<Product>> findTopFeatureProducts();

    @Query("SELECT p FROM Product p JOIN p.category c WHERE  :categories IS NULL OR c.categoryName IN :categories")
    Optional<List<Product>> findProductByCategory(List<String> categories);

    @Query("SELECT DISTINCT p FROM Product p " +
            "JOIN p.productItems v " +
            "WHERE (:categories IS NULL OR p.category.categoryId IN :categories) " +
            "AND (:brands IS NULL OR p.brand.brandId IN :brands) " +
            "AND (:materials IS NULL OR p.material.materialId IN :materials) " +
            "AND (:minPrice IS NULL OR v.salePrice >= :minPrice) " +
            "AND (:maxPrice IS NULL OR v.salePrice <= :maxPrice)")
    List<Product> findFilteredProductsWithVariations(
            @Param("categories") List<String> categories,
            @Param("brands") List<String> brands,
            @Param("materials") List<String> materials,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice);

}
