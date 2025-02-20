package com.example.application.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.application.dto.MonthlyOrderCountDTO;
import com.example.application.dto.OrderCountByStatusDTO;
import com.example.application.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
	// Find orders by user ID and status
	Page<Order> findByUser_UserIdAndOrderStatusOrderByCreatedAtDesc(Long userId, String status, Pageable pageable);

	// Find all orders by status
	Page<Order> findByOrderStatusOrderByCreatedAtDesc(String status, Pageable pageable);

	// Find orders count by status for specific day (year, month, day)
	@Query("""
			SELECT new com.example.application.dto.OrderCountByStatusDTO(CAST(o.orderStatus AS string), COUNT(o))
			FROM Order o
			WHERE YEAR(o.createdAt) = :year
			AND MONTH(o.createdAt) = :month
			AND DAY(o.createdAt) = :day
			GROUP BY o.orderStatus
			""")
	List<OrderCountByStatusDTO> findOrdersCountBySatusAndDate(@Param("year") int year, @Param("month") int month,
			@Param("day") int day);

	// FInd orders count by status for specific month (year, month)
	@Query("""
			SELECT new com.example.application.dto.OrderCountByStatusDTO(CAST(o.orderStatus AS string), COUNT(o))
			FROM Order o
			WHERE YEAR(o.createdAt) = :year
			AND MONTH(o.createdAt) = :month
			GROUP BY o.orderStatus
			""")
	List<OrderCountByStatusDTO> findOrdersCountByStatusAndMonth(@Param("year") int year, @Param("month") int month);

	// Find total finished orders for specific month (year, month)
	@Query("""
			SELECT COUNT(o) FROM Order o
			WHERE YEAR(o.createdAt) = :year
			AND MONTH(o.createdAt) = :month
			AND o.orderStatus = 'DELIVERED'
			""")
	int findTotalFinishedOrdersByMonth(@Param("year") int year, @Param("month") int month);

	// Find total finished for specific year
	@Query("""
			SELECT COUNT(o) FROM Order o
			WHERE YEAR(o.createdAt) = :year
			AND o.orderStatus = 'DELIVERED'
			""")
	int findTotalFinishedOrdersByYear(@Param("year") int year);

	@Query("""
			SELECT new com.example.application.dto.MonthlyOrderCountDTO(MONTH(o.createdAt), COUNT(o))
			FROM Order o
			WHERE YEAR(o.createdAt) = :year
			GROUP BY MONTH(o.createdAt)
			""")
	List<MonthlyOrderCountDTO> findMonthlyOrderCount(@Param("year") int year);

	// Find

}
