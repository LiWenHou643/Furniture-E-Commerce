package com.example.application.mapper;

import com.example.application.dto.response.OrderItemResponse;
import com.example.application.dto.response.OrderResponse;
import com.example.application.entity.OrderItem;
import com.example.application.entity.Orders;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    OrderMapper ORDER_MAPPER = Mappers.getMapper(OrderMapper.class);

    @Mapping(source = "person.id", target = "personId")
    OrderResponse toOrderResponse(Orders orders);

    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.title", target = "productName")
    @Mapping(source = "product.image", target = "productImage")
    OrderItemResponse toOrderItemResponse(OrderItem orderItem);
    

}
