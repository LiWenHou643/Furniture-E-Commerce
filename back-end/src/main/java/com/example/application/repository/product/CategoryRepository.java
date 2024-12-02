package com.example.application.repository.product;

import com.example.application.entity.Category;
import io.micrometer.common.lang.NonNullApi;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

@NonNullApi
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findById(Long id);
}