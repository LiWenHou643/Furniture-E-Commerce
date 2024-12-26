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

    @Column(nullable = false)
    String streetAddress;

    @Column(nullable = false)
    String ward;

    @Column(nullable = false)
    String district;

    @Column(nullable = false)
    String city;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;
}
