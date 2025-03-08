package com.example.application.service;

import java.time.Year;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.application.dto.MonthlyRevenueDTO;
import com.example.application.repository.PaymentRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class PaymentService {

	PaymentRepository paymentRepository;

	public double getTotalIncome() {
		log.info("Getting total income");
		return paymentRepository.getTotalIncome();
	}

	public List<MonthlyRevenueDTO> getMonthlyIncome(Integer year) {
		if (year == null) {
			year = Year.now().getValue();
		}
		log.info("Getting monthly income");
		return paymentRepository.getMonthlyIncome(year);
	}

}
