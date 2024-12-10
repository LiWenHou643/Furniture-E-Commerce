package com.example.application.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class CustomerDTO {
    Long id;
    String firstName;
    String lastName;
    String phoneNumber;
    String avatar;
    Set<AddressDTO> addresses;
}
