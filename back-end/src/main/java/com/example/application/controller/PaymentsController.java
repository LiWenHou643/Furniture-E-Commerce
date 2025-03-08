package com.example.application.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.application.dto.ApiResponse;
import com.example.application.service.PaymentService;

import jakarta.validation.constraints.Min;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/payments")
@Slf4j
public class PaymentsController {
	PaymentService paymentService;

	@GetMapping("/total-income")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> getTotalIncome() {
		log.info("Getting total income");
		return ResponseEntity
				.ok(ApiResponse.builder().message("Total income").data(paymentService.getTotalIncome()).build());
	}

	@GetMapping("/monthly-income")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> getMonthlyIncome(@RequestParam(required = false) @Min(1) Integer year) {
		log.info("Getting monthly income");
		return ResponseEntity.ok(
				ApiResponse.builder().message("Monthly income").data(paymentService.getMonthlyIncome(year)).build());
	}
}
