package com.example.application.repository.order;

import com.example.application.entity.OrderTrackHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderTrackHistoryRepository extends JpaRepository<OrderTrackHistory, Long> {
    @Query("SELECT o.id,o.orderId,o.status, DATE_FORMAT(o.datetime, '%d %b %H:%i') " +
            "FROM OrderTrackHistory o WHERE o.orderId = :orderId")
    List<Object[]> findStatusHistoryByOrderId(@Param("orderId") Long orderId);
}
