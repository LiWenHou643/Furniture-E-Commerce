package com.example.application.entity;

import com.example.application.entity.ValidationGroups.Create;
import com.example.application.entity.ValidationGroups.Login;
import com.example.application.entity.ValidationGroups.Update;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Builder
@Table(name = "person")
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @OneToMany(mappedBy = "person", cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @Builder.Default
    Set<Orders> ordersSet = new HashSet<>();

    @Column(name = "full_name")
    @NotBlank(message = "Full name cannot be blank", groups = {Create.class, Update.class})
    @Size(min = 3, max = 50, message = "Full name must be between 3 and 50 characters", groups = {Create.class, Update.class})
    String fullName;

    @Column(unique = true)
    @NotBlank(message = "Email cannot be blank", groups = {Create.class, Update.class, Login.class})
    @Email(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "Email should be valid",
            groups = {Create.class, Update.class, Login.class})
    String email;

    @Column(name = "phone_number", unique = true)
    String phoneNumber;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    Address address;

    @Column(name = "image", unique = true)
    String image;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotBlank(message = "Password cannot be blank", groups = {Create.class, Update.class, Login.class})
    @Size(min = 8, max = 50, message = "Password must be between 8 and 50 characters",
            groups = {Create.class, Update.class, Login.class})
    String password;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "role_id", referencedColumnName = "id", nullable = false)
    Roles roles;

    @OneToOne(mappedBy = "person", cascade = CascadeType.PERSIST)
    Cart cart;

    @OneToMany(mappedBy = "person", cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @Builder.Default
    Set<RefreshToken> refreshTokens = new HashSet<>();
}