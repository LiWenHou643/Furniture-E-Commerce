package com.example.application.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Builder
@Table(name = "feedbacks", uniqueConstraints = @UniqueConstraint(columnNames = { "order_detail_id", "user_id",
		"product_item_id" }))
public class Feedback extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long feedbackId;

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	User user;

	@ManyToOne
	@JoinColumn(name = "product_item_id", nullable = false)
	ProductItem productItem;

	Integer rating;

	String comment;

	@OneToMany(mappedBy = "feedback", cascade = CascadeType.ALL)
	@Builder.Default
	Set<FeedbackImage> feedbackImages = new HashSet<>();;
}