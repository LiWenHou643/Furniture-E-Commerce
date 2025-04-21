package com.example.application.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.application.dto.OrderDetailDTO;
import com.example.application.entity.OrderDetail;

@Mapper(componentModel = "spring")
public interface OrderDetailMapper {
    @Mapping(target = "productId", source = "productItem.product.productId")
    @Mapping(target = "productName", source = "productItem.product.productName")
    @Mapping(target = "colorType", source = "productItem.color.colorName")
    @Mapping(target = "productItemId", source = "productItem.productItemId")
    @Mapping(target = "productImage", ignore = true)
    OrderDetailDTO toDTO(OrderDetail orderDetail);

    @Mapping(target = "productItem.product.productId", source = "productId")
    @Mapping(target = "order", ignore = true)
    OrderDetail toEntity(OrderDetailDTO orderDetailDTO);
}
