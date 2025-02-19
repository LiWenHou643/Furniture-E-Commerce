package com.example.application.constants;

public enum PaymentMethod {
	CREDIT_CARD("Credit Card"), PAYPAL("PayPal"), CASH_ON_DELIVERY("Cash on Delivery");

	private final String displayName;

	PaymentMethod(String displayName) {
		this.displayName = displayName;
	}

	public String getDisplayName() {
		return displayName;
	}

	public boolean isOnlinePayment() {
		return this == CREDIT_CARD || this == PAYPAL;
	}
}
