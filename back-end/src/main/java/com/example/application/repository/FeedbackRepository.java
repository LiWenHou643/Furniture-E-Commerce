package com.example.application.repository;

import com.example.application.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    @Query("SELECT f FROM Feedback f WHERE f.productItem.product.productId = :productId")
    List<Feedback> findByProductId(@Param("productId") Long productId);
}
