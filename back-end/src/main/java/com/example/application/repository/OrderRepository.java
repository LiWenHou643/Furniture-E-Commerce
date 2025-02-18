package com.example.application.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.application.constants.OrderStatus;
import com.example.application.dto.MonthlySalesDTO;
import com.example.application.dto.SalesSummaryDTO;
import com.example.application.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
	// Find orders by user ID and status
	Page<Order> findByUser_UserIdAndOrderStatusOrderByCreatedAtDesc(Long userId, OrderStatus status, Pageable pageable);

	// Find all orders by status
	Page<Order> findByOrderStatusOrderByCreatedAtDesc(OrderStatus status, Pageable pageable);

	// Find orders for each month
	@Query("SELECT FUNCTION('MONTH', o.createdAt) AS month, SUM(o.total) AS totalSales "
			+ "FROM Order o GROUP BY FUNCTION('MONTH', o.createdAt) ORDER BY month")
	List<MonthlySalesDTO> getMonthlySales();

	// Find total summary sales and orders
	@Query("SELECT SUM(o.total), COUNT(o) FROM Order o")
	SalesSummaryDTO getTotalSalesAndOrders();

	// Find total sales and orders for this month
	@Query("SELECT SUM(o.total), COUNT(o) FROM Order o WHERE FUNCTION('MONTH', o.createdAt) = FUNCTION('MONTH', CURRENT_DATE)")
	SalesSummaryDTO getThisMonthSalesAndOrders();

	// Find total sales and orders for today
	@Query("SELECT SUM(o.total), COUNT(o) FROM Order o WHERE FUNCTION('DATE', o.createdAt) = CURRENT_DATE")
	SalesSummaryDTO getTodaySalesAndOrders();

}
