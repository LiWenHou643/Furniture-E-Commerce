package com.example.application.entity;

import java.time.LocalDateTime;
import java.util.Set;

import com.example.application.constants.OrderStatus;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class Order extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long orderId;

	@ManyToOne
	@JoinColumn(name = "user_id")
	User user;

	double subtotal;

	double total;

	@Enumerated(EnumType.STRING)
	OrderStatus orderStatus;

	LocalDateTime shippingDate;

	LocalDateTime deliveryDate;

	LocalDateTime cancelDate;

	String shippingAddress;

	String shippingMethod;

	double shippingCost;

	String notes;

	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
	Set<OrderDetail> orderDetails;

}
