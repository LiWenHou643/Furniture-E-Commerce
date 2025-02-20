package com.example.application.exception;

import java.nio.file.AccessDeniedException;
import java.util.stream.Collectors;

import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.validation.BindException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.NoHandlerFoundException;

import com.example.application.dto.ApiResponse;

@ControllerAdvice
public class GlobalExceptionHandler {

	// General Exception Handler
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ApiResponse<Object>> handleGeneralException(Exception ex) {
		ApiResponse<Object> response = new ApiResponse<>("error", ex.getMessage(), null);
		return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	// No Handler Found Exception
	@ExceptionHandler(NoHandlerFoundException.class)
	public ResponseEntity<ApiResponse<Object>> handleNoHandlerFoundException(NoHandlerFoundException ex) {
		ApiResponse<Object> response = new ApiResponse<>("error", "No handler found for this request", null);
		return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
	}

	// ResourceNotFoundException Handler
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ApiResponse<Object>> handleResourceNotFound(ResourceNotFoundException ex) {
		ApiResponse<Object> response = new ApiResponse<>("error", ex.getMessage(), null);
		return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
	}

	// DataExistedException Handler
	@ExceptionHandler(DataExistedException.class)
	public ResponseEntity<ApiResponse<Object>> handleDataAlreadyExists(DataExistedException ex) {
		ApiResponse<Object> response = new ApiResponse<>("error", ex.getMessage(), null);
		return new ResponseEntity<>(response, HttpStatus.CONFLICT);
	}

	// InsufficientStockException Handler
	@ExceptionHandler(InsufficientStockException.class)
	public ResponseEntity<ApiResponse<Object>> handleInsufficientStockException(InsufficientStockException ex) {
		ApiResponse<Object> response = new ApiResponse<>("error", ex.getMessage(), null);
		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}

	// MethodArgumentTypeMismatchException Handler (Invalid parameter type in a
	// request)
	@ExceptionHandler(MethodArgumentTypeMismatchException.class)
	public ResponseEntity<ApiResponse<Object>> handleMethodArgumentTypeMismatch(
			MethodArgumentTypeMismatchException ex) {
		ApiResponse<Object> response = new ApiResponse<>("error", ex.getMessage(), null);
		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}

	// ConstraintViolationException Handler
	@ExceptionHandler(DataIntegrityViolationException.class)
	public ResponseEntity<ApiResponse<Object>> handleConstraintViolationException(DataIntegrityViolationException ex) {
		if (ex.getCause() instanceof org.hibernate.exception.ConstraintViolationException constraintEx) {

			String message = "Duplicate entry for field: %s"
					.formatted(extractFieldNameFromConstraint(constraintEx.getConstraintName()));
			ApiResponse<Object> response = ApiResponse.builder().status("error").message(message).build();
			return new ResponseEntity<>(response, HttpStatus.CONFLICT);
		}

		return new ResponseEntity<>(
				ApiResponse.builder().status("error").message("Database integrity violation").build(),
				HttpStatus.BAD_REQUEST);
	}

	// Utility to extract field name from constraint name (customize based on your
	// naming convention)
	private String extractFieldNameFromConstraint(String constraintName) {
		// Assuming the constraint name is in the format "table_name.field_name"
		if (constraintName != null && constraintName.contains(".")) {
			return constraintName.split("\\.")[1];
		}
		return constraintName;
	}

	// BindException Handler (for validation errors in form submissions)
	@ExceptionHandler(BindException.class)
	public ResponseEntity<ApiResponse<Object>> handleBindException(BindException ex) {
		ApiResponse<Object> response = new ApiResponse<>("error", "Binding validation failed: " + ex.getMessage(),
				null);
		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}

	// Handle Method Argument Not Valid Exception (validation failures for method
	// parameters)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ApiResponse<Object>> handleMethodArgumentNotValidException(
			MethodArgumentNotValidException ex) {
		String errorMessage = ex.getBindingResult().getAllErrors().stream()
				.map(DefaultMessageSourceResolvable::getDefaultMessage).collect(Collectors.joining(", "));
		ApiResponse<Object> response = new ApiResponse<>("error", "Validation failed: " + errorMessage, null);
		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}

	// Handle JWT Exceptions (e.g., invalid token, expired token)
	@ExceptionHandler(JwtException.class)
	public ResponseEntity<ApiResponse<Object>> handleJwtException(JwtException ex) {
		ApiResponse<Object> response = new ApiResponse<>("error", "JWT error: " + ex.getMessage(), null);
		return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
	}

	// Handle Authentication Exceptions (e.g., invalid credentials)
	@ExceptionHandler(AuthenticationException.class)
	public ResponseEntity<ApiResponse<Object>> handleAuthenticationException(AuthenticationException ex) {
		ApiResponse<Object> response = new ApiResponse<>("error", "Authentication failed: " + ex.getMessage(), null);
		return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
	}

	// Handle AccessDeniedException Exceptions (e.g., access denied)
	@ExceptionHandler(AccessDeniedException.class)
	public ResponseEntity<ApiResponse<Object>> handleAccessDeniedException(AccessDeniedException ex) {
		ApiResponse<Object> response = new ApiResponse<>("error", "Access denied: " + ex.getMessage(), null);
		return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
	}

	// Handle Authentication Exceptions
	@ExceptionHandler(AuthorizationDeniedException.class)
	public ResponseEntity<ApiResponse<Object>> handleAuthorizationDeniedException(AuthorizationDeniedException ex) {
		ApiResponse<Object> response = new ApiResponse<>("error", "Access denied!", null);
		return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
	}

	// Handle HTTP request method not supported
	@ExceptionHandler(HttpRequestMethodNotSupportedException.class)
	public ResponseEntity<ApiResponse<Object>> handleHttpRequestMethodNotSupported(
			HttpRequestMethodNotSupportedException ex) {
		ApiResponse<Object> response = new ApiResponse<>("error", "Request method not supported: " + ex.getMethod(),
				null);
		return new ResponseEntity<>(response, HttpStatus.METHOD_NOT_ALLOWED);
	}

	// Handle HttpServerErrorException
	@ExceptionHandler(HttpServerErrorException.class)
	public ResponseEntity<ApiResponse<Object>> handleHttpServerErrorException(HttpServerErrorException ex) {
		ApiResponse<Object> response = new ApiResponse<>("error", "Server error: " + ex.getMessage(), null);
		return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	// Handle IllegalArgumentException
	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<ApiResponse<Object>> handleIllegalArgumentException(IllegalArgumentException ex) {
		ApiResponse<Object> response = new ApiResponse<>("error", "Bad request: " + ex.getMessage(), null);
		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}

	// Handle IllegalStateException
	@ExceptionHandler(IllegalStateException.class)
	public ResponseEntity<ApiResponse<Object>> handleIllegalStateException(IllegalStateException ex) {
		ApiResponse<Object> response = new ApiResponse<>("error", "Bad request: " + ex.getMessage(), null);
		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}

	// Handle MissingServletRequestParameterException
	@ExceptionHandler(MissingServletRequestParameterException.class)
	public ResponseEntity<?> handleMissingParams(MissingServletRequestParameterException ex) {
		ApiResponse<Object> response = new ApiResponse<>("error", "Missing parameter: " + ex.getParameterName(), null);
		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}

}
