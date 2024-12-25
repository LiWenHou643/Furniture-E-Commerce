package com.example.application.mapper;

import com.example.application.dto.RoleDTO;
import com.example.application.entity.Role;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface RoleMapper {

    RoleMapper INSTANCE = Mappers.getMapper(RoleMapper.class);

    RoleDTO toRoleDTO(Role role);

    Role toRole(RoleDTO roleDTO);
}
