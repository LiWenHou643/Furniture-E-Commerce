package com.example.application.repository.product;

import com.example.application.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findByIdAndDeletedIsFalse(Long productId);

    Page<Product> findAllByCategory_NameAndDeletedIsFalse(@Param("category") String category, Pageable pageable);

    Page<Product> findAllByDeletedIsFalse(Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.deleted = FALSE " +
            "AND LOWER(REPLACE(p.title, ' ', '')) LIKE LOWER(CONCAT('%', REPLACE(:title, ' ', ''), '%'))")
    List<Product> findAllByTitleContainingIgnoreCaseAndDeletedIsFalse(@Param("title") String title);

    boolean existsByProductCode(String title);
}