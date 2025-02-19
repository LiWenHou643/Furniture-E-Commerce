package com.example.application.constants;

public enum NotificationChannel {
	EMAIL("EMAIL"), SMS("SMS"), IN_APP("IN-APP");

	private final String code;

	NotificationChannel(String code) {
		this.code = code;
	}

	public String getCode() {
		return code;
	}

	public static NotificationChannel fromCode(String code) {
		for (NotificationChannel channel : values()) {
			if (channel.code.equalsIgnoreCase(code)) {
				return channel;
			}
		}
		throw new IllegalArgumentException("Invalid notification channel: " + code);
	}
}
