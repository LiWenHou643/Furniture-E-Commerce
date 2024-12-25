package com.example.application.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.FieldDefaults;

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
    RoleDTO role;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String password;
    boolean userStatus;
}
