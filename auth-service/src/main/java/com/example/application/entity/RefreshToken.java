package com.example.application.entity;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Builder
@Table(name = "refresh_tokens")
public class RefreshToken extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long refreshTokenId;

    String refreshToken;

    boolean revoked;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    Date expiryTime;
}
