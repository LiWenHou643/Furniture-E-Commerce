package com.example.application.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
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
}
