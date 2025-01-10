package com.example.application.mapper;

import com.example.application.dto.OrderDTO;
import com.example.application.entity.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    OrderMapper INSTANCE = Mappers.getMapper(OrderMapper.class);

    @Mapping(target = "orderDetails", source = "orderDetails")
    OrderDTO toDTO(Order order);

    Order toEntity(OrderDTO orderDTO);

}
