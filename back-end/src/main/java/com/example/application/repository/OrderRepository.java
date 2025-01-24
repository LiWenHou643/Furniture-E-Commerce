package com.example.application.repository;

import com.example.application.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository  extends JpaRepository<Order, Long> {
    Optional<Order> findByUser_UserId(Long userId);

    List<Order> findByUser_UserIdOrderByCreatedAtDescOrderStatusAsc(Long userId);

    List<Order> findAllByOrderByCreatedAtDescOrderStatusAsc();

}
