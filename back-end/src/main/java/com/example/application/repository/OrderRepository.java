package com.example.application.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.application.dto.MonthlySalesDTO;
import com.example.application.dto.SalesSummaryDTO;
import com.example.application.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
	// Find orders by user ID and status
	Page<Order> findByUser_UserIdAndOrderStatusOrderByCreatedAtDesc(Long userId, String status, Pageable pageable);

	// Find all orders by status
	Page<Order> findByOrderStatusOrderByCreatedAtDesc(String status, Pageable pageable);

	// Find total sales and orders for ? year
	@Query("SELECT new com.example.application.dto.MonthlySalesDTO(" + "MONTH(o.createdAt), SUM(o.total)) "
			+ "FROM Order o " + "WHERE YEAR(o.createdAt) = :year " + "GROUP BY YEAR(o.createdAt), MONTH(o.createdAt) "
			+ "ORDER BY MONTH(o.createdAt)")
	List<MonthlySalesDTO> getMonthlySales(@Param("year") int year);

	// Find total summary sales and orders
	@Query("SELECT new com.example.application.dto.SalesSummaryDTO(SUM(o.total), COUNT(o)) FROM Order o WHERE o.orderStatus = 'delivered'")
	SalesSummaryDTO getTotalSalesAndOrders();

	// Find total sales and orders for this month
	@Query("SELECT new com.example.application.dto.SalesSummaryDTO(SUM(o.total), COUNT(o)) " + "FROM Order o "
			+ "WHERE MONTH(o.createdAt) = MONTH(CURRENT_DATE)")
	SalesSummaryDTO getThisMonthSalesAndOrders();

	// Find total sales and orders for today
	@Query("SELECT new com.example.application.dto.SalesSummaryDTO(SUM(o.total), COUNT(o)) " + "FROM Order o "
			+ "WHERE DATE(o.createdAt) = CURRENT_DATE")
	SalesSummaryDTO getTodaySalesAndOrders();

}
