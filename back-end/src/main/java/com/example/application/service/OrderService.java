package com.example.application.service;

import com.example.application.dto.OrderDTO;
import com.example.application.entity.Order;
import com.example.application.entity.OrderDetail;
import com.example.application.exception.ResourceNotFoundException;
import com.example.application.mapper.OrderDetailMapper;
import com.example.application.mapper.OrderMapper;
import com.example.application.repository.OrderRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class OrderService {

    OrderRepository orderRepository;

    public List<OrderDTO> getOrdersByUserId(Long userId) {
        var orders = orderRepository.findByUser_UserId(userId);

        // Sort orders by createdDate (descending) and orderStatus (ascending)
        return orders.stream().parallel()
                     .sorted(Comparator.comparing(Order::getCreatedAt).reversed()
                                       .thenComparing(Order::getOrderStatus))
                     .map(OrderMapper.INSTANCE::toDTO)
                     .collect(Collectors.toList());
    }


    public OrderDTO getOrderById(Long userId, Long orderId) {
        var order = orderRepository.findById(orderId)
                                   .orElseThrow(() -> new ResourceNotFoundException("Order", "id", orderId));

        if (!order.getUser().getUserId().equals(userId)) {
            throw new RuntimeException("You do not have permission to access this order.");
        }

        // Convert Set<OrderDetail> to List<OrderDetail> and sort by orderDetailId
        var sortedOrderDetails = new ArrayList<>(order.getOrderDetails());
        sortedOrderDetails.sort(Comparator.comparing(OrderDetail::getOrderDetailId));

        var orderDTO = OrderMapper.INSTANCE.toDTO(order);
        orderDTO.setOrderDetails(sortedOrderDetails.stream()
                                                   .map(OrderDetailMapper.INSTANCE::toDTO)
                                                   .collect(Collectors.toList()));

        return orderDTO;
    }


}
