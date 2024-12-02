package com.example.application.dto.request;

import com.example.application.entity.PaymentMethod;

import java.math.BigDecimal;
import java.util.List;

public record OrderRequest(Long personId,
                           String promoCode, String shippingAddress, String notes,
                           BigDecimal shipCost,
                           PaymentMethod paymentMethod, List<Long> selectedCartItems) {
}
