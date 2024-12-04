package com.example.application.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "refresh_tokens")
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "refresh_token", nullable = false, length = 10000)
    String refreshToken;

    @Column(name = "revoked")
    boolean revoked;

//    @ManyToOne
//    @JoinColumn(name = "person_id", referencedColumnName = "id")
//    Person person;
}