package com.example.application.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.application.dto.MonthlyRevenueDTO;
import com.example.application.entity.Payments;

public interface PaymentRepository extends JpaRepository<Payments, Long> {

	@Query("SELECT SUM(p.paymentAmount) FROM Payments p")
	double getTotalIncome();

	@Query("""
					SELECT new com.example.application.dto.MonthlyRevenueDTO(
					             MONTH(p.paymentDate),
					             SUM(p.paymentAmount)
					         )
					         FROM Payments p
					         WHERE year(p.paymentDate) = :year AND p.paymentStatus = 'PAID'
					         GROUP BY MONTH(p.paymentDate)
			""")
	List<MonthlyRevenueDTO> getMonthlyIncome(@Param("year") int year);

}
