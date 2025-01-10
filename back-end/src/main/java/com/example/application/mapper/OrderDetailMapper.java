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
    @Mapping(target = "productName", source = "product.productName")
    @Mapping(target = "colorType", source = "productItem.color.colorName")
    @Mapping(target = "productItemId", source = "productItem.productItemId")
    OrderDetailDTO toDTO(OrderDetail orderDetail);

    OrderDetail toEntity(OrderDetailDTO orderDetailDTO);
}
