package com.example.application.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class AddressDTO {
    Long addressId;
    String unitNumber; // Optional for apartments or buildings
    int streetNumber;  // Numeric street number
    String streetName;  // Name of the street
    String wardName;  // Ward or Commune (optional)
    String districtName;  // District
    String cityProvince;  // City or Province
    String postalCode;  // Postal code
    String country;  // Country, default is Vietnam
}
