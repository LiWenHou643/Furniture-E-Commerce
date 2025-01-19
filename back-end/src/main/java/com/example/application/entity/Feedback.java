package com.example.application.entity;

import com.example.application.dto.FeedbackImage;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Builder
@Table(
        name = "feedbacks",
        uniqueConstraints = @UniqueConstraint(
                columnNames = {"order_detail_id", "user_id", "product_item_id"}
        )
)
public class Feedback extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long feedbackId;

    @OneToOne
    @JoinColumn(name = "order_detail_id", nullable = false)
    OrderDetail orderDetail;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;

    @ManyToOne
    @JoinColumn(name = "product_item_id", nullable = false)
    ProductItem productItem;

    Integer rating;

    String comment;

    @OneToMany(mappedBy = "feedback", cascade = CascadeType.ALL)
    Set<FeedbackImage> feedbackImages;
}