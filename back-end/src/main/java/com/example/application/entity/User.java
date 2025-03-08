package com.example.application.entity;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Builder
@Table(name = "users")
public class User extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long userId;

	@Column(nullable = false, name = "first_name")
	String firstName;

	@Column(nullable = false, name = "last_name")
	String lastName;

	String avatar;

	@Column(unique = true, nullable = false, name = "email")
	String email;

	@Column(unique = true, nullable = false, name = "phone_number")
	String phoneNumber;

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	String password;

	@Builder.Default
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	Set<Address> addresses = new HashSet<>();

	@ManyToOne
	@JoinColumn(name = "role_id", nullable = false)
	Role role;

	@Builder.Default
	Boolean userStatus = true;
}
