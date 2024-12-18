package com.example.application.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "product_feedback")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Feedback extends BaseEntity {

    @EmbeddedId
    private FeedbackPK id;

    @Column(name = "rating")
    private Integer rating;

    @Column(name = "comment")
    private String comment;
}
