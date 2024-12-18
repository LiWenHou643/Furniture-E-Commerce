package com.example.application.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
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
    AddressDTO address;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String password;
    boolean userStatus;
}
