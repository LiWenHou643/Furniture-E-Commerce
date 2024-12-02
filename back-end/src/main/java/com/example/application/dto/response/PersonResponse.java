package com.example.application.dto.response;

import com.example.application.entity.Address;
import com.example.application.entity.Roles;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PersonResponse {
    Long id;
    String fullName;
    String email;
    String phoneNumber;
    Address address;
    @JsonIgnore
    String password;
    Roles roles;
    String image;
}