package com.example.application.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.application.dto.CartDTO;
import com.example.application.entity.Cart;

@Mapper(componentModel = "spring", uses = { CartItemMapper.class })
public interface CartMapper {
	@Mapping(target = "userId", source = "user.userId")
	CartDTO toDTO(Cart cart);

	@Mapping(target = "user", ignore = true)
	Cart toEntity(CartDTO cartDTO);

}
