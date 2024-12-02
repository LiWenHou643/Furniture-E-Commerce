package com.example.application.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    ACCESS_DENIED(9998, "Access denied", HttpStatus.FORBIDDEN),
    PATH_NOT_FOUND(8888, "Path not found", HttpStatus.NOT_FOUND),

    USER_EXISTED(1001, "User existed", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1002, "User not existed", HttpStatus.NOT_FOUND),
    PASSWORD_NOT_MATCH(1003, "Password not match", HttpStatus.BAD_REQUEST),
    ROLE_NOT_FOUND(1004, "Role not found", HttpStatus.NOT_FOUND),
    JWT_INVALID(1005, "JWT invalid", HttpStatus.UNAUTHORIZED),
    JWT_EXPIRED(1006, "JWT expired", HttpStatus.UNAUTHORIZED),
    REFRESH_TOKEN_INVALID(1007, "Refresh token invalid", HttpStatus.UNAUTHORIZED),
    REFRESH_TOKEN_REVOKED(1008, "Refresh token revoked", HttpStatus.UNAUTHORIZED),
    PROMOTION_CODE_INVALID(1009, "Promotion code invalid", HttpStatus.BAD_REQUEST),

    NAME_INVALID(1011, "Name invalid", HttpStatus.BAD_REQUEST),
    EMAIL_INVALID(1012, "Email invalid", HttpStatus.BAD_REQUEST),
    PASSWORD_INVALID(1013, "Password invalid", HttpStatus.BAD_REQUEST),
    REGISTER_FAILED(1014, "Register failed", HttpStatus.BAD_REQUEST),

    UNAUTHENTICATED(1998, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1999, "You do not have permission", HttpStatus.FORBIDDEN),

    PRODUCT_NOT_FOUND(2001, "Product not found", HttpStatus.NOT_FOUND),
    PRODUCT_EXISTED(2002, "Product existed", HttpStatus.BAD_REQUEST),
    INSUFFICIENT_STOCK(2003, "Insufficient stock", HttpStatus.BAD_REQUEST),

    CART_ITEM_NOT_FOUND(3001, "Cart item not found", HttpStatus.NOT_FOUND),
    FAILED_TO_CREATE_ORDER(3002, "Failed to create order", HttpStatus.BAD_REQUEST),
    ORDER_NOT_FOUND(3003, "Order not found", HttpStatus.NOT_FOUND),
    ORDER_CANCEL_FAILED(3004, "Order cancel failed", HttpStatus.BAD_REQUEST),
    ORDER_CONFIRM_FAILED(3005, "Order confirm failed", HttpStatus.BAD_REQUEST),

    PAYMENT_METHOD_NOT_SUPPORTED(4001, "Payment method not supported", HttpStatus.BAD_REQUEST),
    PAYPAL_FAILED(4002, "Paypal failed", HttpStatus.BAD_REQUEST);

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;

}