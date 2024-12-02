package com.example.application.exception;

import com.example.application.dto.response.ApiResponse;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.security.oauth2.jwt.BadJwtException;
import org.springframework.security.oauth2.server.resource.InvalidBearerTokenException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.nio.file.AccessDeniedException;
import java.text.ParseException;


@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    ApiResponse<Void> handleException(Exception e) {
        return ApiResponse.<Void>builder()
                          .code(ErrorCode.UNCATEGORIZED_EXCEPTION.getCode())
                          .message(ErrorCode.UNCATEGORIZED_EXCEPTION.getMessage())
                          .build();
    }

    @ExceptionHandler(RuntimeException.class)
    ApiResponse<Void> handleRuntimeException(RuntimeException e) {
        return ApiResponse.<Void>builder()
                          .code(ErrorCode.UNCATEGORIZED_EXCEPTION.getCode())
                          .message(ErrorCode.UNCATEGORIZED_EXCEPTION.getMessage())
                          .build();
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    ApiResponse<Void> handleNoHandlerFoundException(NoHandlerFoundException e) {
        return ApiResponse.<Void>builder()
                          .code(ErrorCode.PATH_NOT_FOUND.getCode())
                          .message(ErrorCode.PATH_NOT_FOUND.getMessage())
                          .build();
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ApiResponse<Void> handleAccessDeniedException(AccessDeniedException e) {
        return ApiResponse.<Void>builder()
                          .code(ErrorCode.ACCESS_DENIED.getCode())
                          .message(ErrorCode.ACCESS_DENIED.getMessage())
                          .build();
    }

    @ExceptionHandler(AuthorizationDeniedException.class)
    public ApiResponse<Void> handleAuthorizationDeniedException(AuthorizationDeniedException e) {
        return ApiResponse.<Void>builder()
                          .code(ErrorCode.ACCESS_DENIED.getCode())
                          .message(ErrorCode.ACCESS_DENIED.getMessage())
                          .build();
    }

    @ExceptionHandler(AppException.class)
    public ApiResponse<Void> handleAppException(AppException e) {
        ErrorCode errorCode = e.getErrorCode();
        return ApiResponse.<Void>builder()
                          .code(errorCode.getCode())
                          .message(errorCode.getMessage())
                          .details(e.getDetails()) // Add details to the response
                          .build();
    }


    @ExceptionHandler({InvalidBearerTokenException.class, BadJwtException.class, ParseException.class})
    public ApiResponse<Void> handleInvalidBearerTokenException(InvalidBearerTokenException e) {
        return ApiResponse.<Void>builder()
                          .code(ErrorCode.REFRESH_TOKEN_INVALID.getCode())
                          .message(ErrorCode.REFRESH_TOKEN_INVALID.getMessage())
                          .build();
    }
}