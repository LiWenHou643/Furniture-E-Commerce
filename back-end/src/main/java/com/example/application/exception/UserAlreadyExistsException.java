package com.example.application.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserAlreadyExistsException extends RuntimeException{

  private String resourceName;

  // Constructor
  public UserAlreadyExistsException(String resourceName) {
    super(String.format("User has %s already existed in database", resourceName));
    this.resourceName = resourceName;
  }
}