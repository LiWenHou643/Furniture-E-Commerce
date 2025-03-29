package com.example.application.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AddressDTO {
    Long addressId;
    String streetAddress;
    String ward;
    String district;
    String city;
    Boolean defaultAddress;

    // This is the user ID of the user whose address is being updated
    Long userId;
}
