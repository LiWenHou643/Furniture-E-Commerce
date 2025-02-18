package com.example.application.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.example.application.dto.CartDTO;
import com.example.application.entity.Cart;

@Mapper(componentModel = "spring")
public interface CartMapper {

	CartMapper INSTANCE = Mappers.getMapper(CartMapper.class);

	CartDTO toDTO(Cart cart);

	Cart toEntity(CartDTO cartDTO);

}
