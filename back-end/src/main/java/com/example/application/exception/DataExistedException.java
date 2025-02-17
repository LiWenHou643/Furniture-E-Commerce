package com.example.application.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DataExistedException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	private String resourceName;
	private String fieldName;
	private Object fieldValue;

	// Constructor
	public DataExistedException(String resourceName, String fieldName, Object fieldValue) {
		super(String.format("%s has %s: %s already existed in database", resourceName, fieldName, fieldValue));
		this.resourceName = resourceName;
	}
}