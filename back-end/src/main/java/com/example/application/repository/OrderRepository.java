package com.example.application.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.application.dto.MonthlySalesDTO;
import com.example.application.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

	// Find orders by user ID and status
	Page<Order> findByUser_UserIdAndOrderStatusOrderByCreatedAtDesc(Long userId, String status, Pageable pageable);

	// Find all orders by status
	Page<Order> findByOrderStatusOrderByCreatedAtDesc(String status, Pageable pageable);

	// Find total orders for specific date (year, month, day)
	@Query("SELECT COUNT(o) FROM Order o WHERE YEAR(o.createdAt) = year"
			+ " AND MONTH(o.createdAt) = month AND DAY(o.createdAt) = day")
	int findTotalOrdersByDate(@Param("year") int year, @Param("month") int month, @Param("day") int day);

	// Find total orders for specific day
	@Query("SELECT COUNT(o) FROM Order o WHERE DAY(o.createdAt) = day")
	int findTotalOrdersByDay(@Param("day") int day);

	// Find total orders for specific month
	@Query("SELECT COUNT(o) FROM Order o WHERE EAR(o.createdAt) = year AND MONTH(o.createdAt) = month")
	int findTotalOrdersByMonth(@Param("year") int year, @Param("month") int month);

	// Find total orders for specific year
	@Query("SELECT COUNT(o) FROM Order o WHERE YEAR(o.createdAt) = year")
	int findTotalOrdersByYear(@Param("year") int year);

	// Find monthly order count for specific year
	@Query("SELECT new com.example.application.dto.MonthlySalesDTO(MONTH(o.createdAt) as month, COUNT(o) as count) FROM Order o WHERE YEAR(o.createdAt) = year GROUP BY MONTH(o.createdAt)")
	List<MonthlySalesDTO> findMonthlyOrderCount(@Param("year") int year);

}
