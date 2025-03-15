package com.example.application.dto;

import java.util.Date;

import com.example.application.constants.PaymentMethod;
import com.example.application.constants.PaymentStatus;
import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class PaymentDTO {
	
	Long paymentId;

	Long orderId;

	Date paymentDate;

	Double paymentAmount;

	@Enumerated(EnumType.STRING)
	PaymentMethod paymentMethod;

	@Enumerated(EnumType.STRING)
	PaymentStatus paymentStatus;

	String transactionReference;

}
