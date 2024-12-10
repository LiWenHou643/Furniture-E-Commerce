package com.example.application.mapper;

import com.example.application.dto.UserDTO;
import com.example.application.entity.Users;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(target = "roleId", source = "role.roleId")
    @Mapping(target = "roleName", source = "role.roleName")
    UserDTO toDTO(Users user);

    Users toEntity(UserDTO userDTO);
}
