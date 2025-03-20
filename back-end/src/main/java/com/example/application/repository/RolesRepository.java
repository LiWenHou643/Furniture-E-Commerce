package com.example.application.repository;

import com.example.application.constants.AppRoles;
import com.example.application.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RolesRepository extends JpaRepository<Role, Long> {
	Optional<Role> findByRoleName(AppRoles roleName);
}