package com.example.application.entity;

import java.util.Date;

import com.example.application.constants.PaymentMethod;
import com.example.application.constants.PaymentStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "payments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class Payments extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long paymentId;

	@OneToOne
	@JoinColumn(name = "order_id")
	Order order;

	Date paymentDate;

	Double paymentAmount;

	@Enumerated(EnumType.STRING)
	PaymentMethod paymentMethod;

	@Enumerated(EnumType.STRING)
	PaymentStatus paymentStatus;

	String transactionReference;
}
