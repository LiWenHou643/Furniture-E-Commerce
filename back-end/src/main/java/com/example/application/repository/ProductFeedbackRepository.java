package com.example.application.repository;

import com.example.application.entity.ProductFeedback;
import com.example.application.entity.ProductFeedbackPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductFeedbackRepository extends JpaRepository<ProductFeedback, ProductFeedbackPK> {
    // Custom query methods if needed
}
