package com.example.application.dto;

import com.example.application.entity.BaseEntity;
import com.example.application.entity.Feedback;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Builder
@Table(name = "feedback_images")
public class FeedbackImage extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long feedbackImageId;

    @ManyToOne
    @JoinColumn(name = "feedback_id", nullable = false)
    Feedback feedback;

    String imageUrl;
}
