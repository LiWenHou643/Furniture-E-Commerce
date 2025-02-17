package com.example.application.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InsufficientStockException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	private String resourceName;
	private String resourceValue;

	// Constructor
	public InsufficientStockException(String resourceName, String resourceValue) {
		super(String.format("Insufficient stock for %s: '%s'", resourceName, resourceValue));
		this.resourceName = resourceName;
		this.resourceValue = resourceValue;
	}
}
