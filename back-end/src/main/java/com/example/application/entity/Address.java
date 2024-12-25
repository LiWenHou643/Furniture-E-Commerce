package com.example.application.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Builder
@Table(name = "addresses")
public class Address extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long addressId;

    String unitNumber;  // Optional for apartments or buildings
    int streetNumber;  // Numeric street number
    String streetName;  // Name of the street
    String wardName;  // Ward or Commune (optional)
    String districtName;  // District
    String cityProvince;  // City or Province
    String postalCode;  // Postal code
    String country = "Vietnam";  // Country, default is Vietnam

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;
}
