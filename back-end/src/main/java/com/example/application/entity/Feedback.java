package com.example.application.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Builder
@Table(name = "feedbacks")
@IdClass(FeedbackID.class)
public class Feedback extends BaseEntity {
    @Id
    Long orderId;
    @Id
    Long userId;
    @Id
    Long productItemId;

    Integer rating;

    String comment;
}
