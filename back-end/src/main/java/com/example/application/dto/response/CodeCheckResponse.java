package com.example.application.dto.response;

import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record CodeCheckResponse(String promoCode, BigDecimal value) {
}
