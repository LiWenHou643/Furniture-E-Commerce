package com.example.application.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "refresh_tokens")
public class RefreshToken extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long refreshTokenId;

    @Column(nullable = false)
    String refreshToken;

    @Builder.Default
    boolean revoked = false;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;
}