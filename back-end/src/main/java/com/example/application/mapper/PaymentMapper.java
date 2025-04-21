package com.example.application.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.application.dto.PaymentDTO;
import com.example.application.entity.Payments;

@Mapper(componentModel = "spring")
public interface PaymentMapper {

	@Mapping(target = "orderId", source = "order.orderId")
    PaymentDTO toDTO(Payments payments);

	@Mapping(target = "order", ignore = true)
    Payments toEntity(PaymentDTO paymentDTO);

}
