package com.example.application.mapper;

import com.example.application.dto.OrderDetailDTO;
import com.example.application.entity.OrderDetail;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface OrderDetailMapper {

    OrderDetailMapper INSTANCE = Mappers.getMapper(OrderDetailMapper.class);

    @Mapping(target = "productId", source = "product.productId")
    OrderDetailDTO toDTO(OrderDetail orderDetail);

    OrderDetail toEntity(OrderDetailDTO orderDetailDTO);
}
