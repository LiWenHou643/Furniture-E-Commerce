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
@Table(name = "admins")
public class Admin extends BaseEntity{
    @Id
    String username;

    String password;

    @ManyToOne
    @JoinColumn(name = "role_id", referencedColumnName = "roleId")
    Role role;
}
