package com.example.application.dto;

import com.example.application.validator.TrimmedSize;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateUserRequest {
    @NotBlank(message = "First name is mandatory")
    @TrimmedSize(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
    String firstName;

    @NotBlank(message = "Last name is mandatory")
    @TrimmedSize(min = 2, max = 50, message = "Last name must be between 2 and 50 characters")
    String lastName;

    @NotBlank(message = "Password is mandatory")
    @TrimmedSize(min = 8, max = 50, message = "Password must be between 8 and 50 characters")
    String password;

    @NotBlank(message = "Email is mandatory")
    @Email(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "Email should be valid")
    private String email;

    @NotBlank(message = "Phone number is mandatory")
    String phoneNumber;

    AddressDTO address;

    String avatar;
}
