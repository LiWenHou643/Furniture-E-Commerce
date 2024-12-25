package com.example.application.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class AuthDTO {
    // Response
    String accessToken;
    Integer accessTokenExpiry;

    // Request
    @NotNull(message = "Username is required")
    String username;
    @NotNull(message = "Password is required")
    String password;
    boolean persistent;
    boolean isAdmin;
}