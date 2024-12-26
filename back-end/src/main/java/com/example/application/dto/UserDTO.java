package com.example.application.dto;

import com.example.application.validator.TrimmedSize;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDTO {
    Long userId;
    String firstName;
    String lastName;
    String avatar;
    String email;
    String phoneNumber;
    Set<AddressDTO> addresses;
    RoleDTO role;
    boolean userStatus;

    // Use for updating user password
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @TrimmedSize(min = 8, max = 50, message = "Password must be between 8 and 50 characters")
    String newPassword;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @TrimmedSize(min = 8, max = 50, message = "Password must be between 8 and 50 characters")
    String oldPassword;
}
