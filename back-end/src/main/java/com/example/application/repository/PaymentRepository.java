package com.example.application.repository;

import com.example.application.entity.Payments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PaymentRepository extends JpaRepository<Payments, Long> {

	// Find total revenues for specific date time
	@Query("SELECT SUM(p) FROM Payment p WHERE YEAR(p.createdAt) = year"
			+ " AND MONTH(p.createdAt) = month AND DAY(p.createdAt) = day")
	int findTotalRevenueByDate(@Param("year") int year, @Param("month") int month, @Param("day") int day);

}
