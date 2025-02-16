package com.example.application.repository;

import com.example.application.constants.OrderStatus;
import com.example.application.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository  extends JpaRepository<Order, Long> {
    // Find orders by user ID and status
    Page<Order> findByUser_UserIdAndOrderStatusOrderByCreatedAtDesc(
            Long userId, OrderStatus status, Pageable pageable);

    // Find all orders by status
    Page<Order> findByOrderStatusOrderByCreatedAtDesc(OrderStatus status, Pageable pageable);

}
