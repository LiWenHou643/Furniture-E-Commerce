package com.example.application.service;

import com.example.application.dto.response.OrderResponse;
import com.example.application.dto.response.PaymentLink;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
@Transactional
public class StripeService {
    @Value("${stripe.secret-key}")
    String stripeSecretKey;

    @Value("${stripe.currency}")
    String currency;

    public PaymentLink createPaymentLink(OrderResponse order) throws StripeException {
        Stripe.apiKey = stripeSecretKey;
        BigDecimal totalAmount = order.getTotal(); // Assuming this returns BigDecimal
        long amountInCents = totalAmount
                .setScale(0, RoundingMode.HALF_UP) // Ensure it's rounded properly
                .longValue();

        SessionCreateParams params =
                SessionCreateParams.builder()
                                   .addPaymentMethodType(
                                           SessionCreateParams.PaymentMethodType.CARD)
                                   .setMode(SessionCreateParams.Mode.PAYMENT)
                                   .setSuccessUrl("http://localhost:3000/payment/success/%d".formatted(order.getId()))
                                   .setCancelUrl("http://localhost:3000/payment/fail")
                                   .addLineItem(SessionCreateParams.LineItem.builder()
                                                                            .setQuantity(1L)
                                                                            .setPriceData(
                                                                                    SessionCreateParams.LineItem.PriceData.builder()
                                                                                                                          .setCurrency(
                                                                                                                                  currency)
                                                                                                                          .setUnitAmount(
                                                                                                                                  amountInCents)
                                                                                                                          .setProductData(
                                                                                                                                  SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                                                                                                                                    .setName(
                                                                                                                                                                                            "Eye Hero")
                                                                                                                                                                                    .build())
                                                                                                                          .build())
                                                                            .build())
                                   .build();

        Session session = Session.create(params);

        return PaymentLink.builder().paymentUrl(session.getUrl()).build();
    }
}
