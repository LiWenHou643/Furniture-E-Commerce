package com.example.application.constants;

public enum OrderStatus {
    PENDING,       // Order has been placed, awaiting confirmation
    PROCESSING,     // Payment has been confirmed
    SHIPPED,       // Order has been shipped
    DELIVERED,     // Order has been delivered to the customer
    CANCELLED,     // Order has been cancelled
}
