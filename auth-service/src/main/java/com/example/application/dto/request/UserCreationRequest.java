package com.example.application.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreationRequest {
    @NotEmpty(message = "Email is required")
    @Email(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "Invalid email format")
    String email;

    @NotEmpty(message = "Password is required")
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
            message = "Password must be at least 8 characters long, contain uppercase and lowercase letters, a digit, and a special character.")
    String password;

    @NotEmpty(message = "Phone number is required")
    @Pattern(regexp = "^(0[3|5|7|8|9]{1}[0-9]{8}|(03|05|07|08|09)[0-9]{8})$",
            message = "Invalid Vietnamese phone number format")
    String phoneNumber;

    @NotEmpty(message = "First name is required")
    String firstName;

    @NotEmpty(message = "Last name is required")
    String lastName;
}