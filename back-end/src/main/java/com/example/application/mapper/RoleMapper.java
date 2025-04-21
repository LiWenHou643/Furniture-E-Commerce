package com.example.application.mapper;

import org.mapstruct.Mapper;

import com.example.application.dto.RoleDTO;
import com.example.application.entity.Role;

@Mapper(componentModel = "spring")
public interface RoleMapper {

    RoleDTO toRoleDTO(Role role);

    Role toRole(RoleDTO roleDTO);
}
