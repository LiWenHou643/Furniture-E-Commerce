package com.example.application.constants;

public enum PaymentStatus {
	UNPAID, PAID;

	public boolean isPaid() {
		return this == PAID;
	}
}
