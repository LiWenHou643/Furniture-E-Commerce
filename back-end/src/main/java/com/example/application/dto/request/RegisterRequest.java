package com.example.application.dto.request;

import com.example.application.validator.TrimmedSize;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RegisterRequest {
    @NotBlank(message = "Full name cannot be blank")
    @TrimmedSize(min = 3, max = 50, message = "Full name must be between 3 and 50 characters")
    String fullName;

    @NotBlank(message = "Email cannot be blank")
    @Email(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "Email must be valid")
    String email;

    @NotBlank(message = "Password cannot be blank")
    @TrimmedSize(min = 8, max = 50, message = "Password must be between 8 and 50 characters")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String password;
}