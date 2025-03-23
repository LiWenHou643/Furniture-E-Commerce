package com.example.application.constants;

public enum NotificationType {
	WELCOME_EMAIL("Welcome Email"), FORGOT_PASSWORD("Forgot Password"), PROMOTION("Promotion"), REMINDER("Reminder"),
	ACCOUNT_VERIFICATION("Account Verification");

	private final String description;

	// Constructor to assign a description to each enum constant
	NotificationType(String description) {
		this.description = description;
	}

	// Getter for the description
	public String getDescription() {
		return description;
	}

	@Override
	public String toString() {
		return description;
	}
}
