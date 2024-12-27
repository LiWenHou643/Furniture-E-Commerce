package com.example.application.mapper;

import com.example.application.dto.CartDTO;
import com.example.application.entity.Cart;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface CartMapper {

    CartMapper INSTANCE = Mappers.getMapper(CartMapper.class);

    @Mapping(target = "userId", source = "user.userId")
    CartDTO toDTO(Cart cart);

    Cart toEntity(CartDTO cartDTO);

}
