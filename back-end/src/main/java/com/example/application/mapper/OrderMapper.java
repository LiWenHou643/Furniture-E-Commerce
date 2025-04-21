package com.example.application.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.application.dto.OrderDTO;
import com.example.application.entity.Order;

@Mapper(componentModel = "spring", uses = {OrderDetailMapper.class, PaymentMapper.class})
public interface OrderMapper {

    @Mapping(target = "userId", ignore = true)
    @Mapping(target = "userEmail", ignore = true)
    @Mapping(target = "userPhone", ignore = true)
    @Mapping(target = "userName", ignore = true)
    @Mapping(target = "leaveFeedback", ignore = true)
    @Mapping(target = "paymentMethod", source = "payment.paymentMethod")
    @Mapping(target = "orderId", source = "orderId")
    OrderDTO toDTO(Order order);

    @Mapping(target = "user", ignore = true)
    Order toEntity(OrderDTO orderDTO);

}
