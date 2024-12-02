package com.example.application.controller;

import com.example.application.config.Authentication.JwtUtils;
import com.example.application.exception.AppException;
import com.example.application.exception.ErrorCode;
import com.example.application.service.PaymentService;
import com.paypal.base.rest.PayPalRESTException;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.net.URI;

import static lombok.AccessLevel.PRIVATE;

@RestController
@FieldDefaults(level = PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class PaypalController {
    PaymentService paymentService;
    JwtUtils jwtUtils;

    @GetMapping("/payment/success")
    public ResponseEntity<Void> successPayment(@RequestParam(name = "accessToken") String accessToken,
            @RequestParam(name = "orderId") String orderId,
            @RequestParam(name = "paymentId") String paymentId,
            @RequestParam(name = "PayerID") String payerId,
            @RequestParam(name = "selectedItems") String selectedItems) {
        try {
            Jwt jwt = jwtUtils.getToken(accessToken);
            boolean isExpired = jwtUtils.isExpired(jwt);
            boolean isInvalidated = jwtUtils.isInvalidated(jwt);
            if (isExpired) {
                throw new AppException(ErrorCode.JWT_EXPIRED);
            } else if (isInvalidated) {
                throw new AppException(ErrorCode.JWT_INVALID);
            }


            paymentService.executePaypalPayment(paymentId, payerId, orderId, selectedItems);
            return ResponseEntity.status(HttpStatus.FOUND)
                                 .location(
                                         URI.create(
                                                 "http://localhost:3000/order-details/%s".formatted(
                                                         orderId))) // Change to your frontend URL,
                                 .build();
        } catch (PayPalRESTException e) {
            throw new AppException(ErrorCode.PAYPAL_FAILED);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }
}