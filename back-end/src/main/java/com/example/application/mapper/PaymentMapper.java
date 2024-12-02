package com.example.application.mapper;

import com.example.application.dto.response.PaymentResponse;
import com.example.application.entity.Payments;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface PaymentMapper {
    PaymentMapper INSTANCE = Mappers.getMapper(PaymentMapper.class);

    PaymentResponse toPaymentResponse(Payments payment);
}
