package com.example.application.repository;

import com.example.application.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByEmail(String email);
    Optional<Users> findByPhoneNumber(String phoneNumber);
    Boolean existsByEmail(String email);
    Boolean existsByPhoneNumber(String phoneNumber);
}
