package com.example.application.constants;

public enum OrderStatus {
	PENDING("Order has been placed, awaiting confirmation"),
	PROCESSING("Order has been confirmed and is being processed"), SHIPPED("Order has been shipped"),
	DELIVERED("Order has been delivered to the customer"), CANCELLED("Order has been cancelled");

	private final String description;

	OrderStatus(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

	public boolean canCancel() {
		return this == PENDING || this == PROCESSING;
	}

	public boolean isFinalized() {
		return this == DELIVERED || this == CANCELLED;
	}
}
