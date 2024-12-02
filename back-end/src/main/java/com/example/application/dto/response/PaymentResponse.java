package com.example.application.dto.response;

import com.example.application.entity.PaymentMethod;
import com.example.application.entity.PaymentStatus;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PaymentResponse {
    Long id;
    PaymentStatus status;
    BigDecimal amount;
    PaymentMethod paymentMethod;
    String transactionId;
}
