package com.example.application.constants;

public enum OrderStatus {
    pending,       // Order has been placed, awaiting confirmation
    processing,     // Order has been confirmed and is being processed
    shipped,       // Order has been shipped
    delivered,     // Order has been delivered to the customer
    cancelled,     // Order has been cancelled
}
