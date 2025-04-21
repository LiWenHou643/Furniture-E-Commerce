package com.example.application.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.application.dto.UserDTO;
import com.example.application.entity.User;

@Mapper(componentModel = "spring", uses = {AddressMapper.class})
public interface UserMapper {
    @Mapping(target = "newPassword", ignore = true)
    @Mapping(target = "oldPassword", ignore = true)
    UserDTO toDTO(User user);

    @Mapping(target = "password", ignore = true)
    User toEntity(UserDTO userDTO);
}
