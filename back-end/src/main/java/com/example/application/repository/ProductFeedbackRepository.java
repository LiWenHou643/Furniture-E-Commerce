package com.example.application.repository;

import com.example.application.entity.Feedback;
import com.example.application.entity.FeedbackPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductFeedbackRepository extends JpaRepository<Feedback, FeedbackPK> {
    // Custom query methods if needed
}
