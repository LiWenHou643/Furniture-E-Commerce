package com.example.application.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.example.application.dto.CartItemDTO;
import com.example.application.entity.CartItem;

@Mapper(componentModel = "spring")
public interface CartItemMapper {
	CartItemMapper INSTANCE = Mappers.getMapper(CartItemMapper.class);

	@Mapping(source = "productItem.productItemId", target = "productItemId")
	@Mapping(source = "productItem.product", target = "product")
	CartItemDTO toDTO(CartItem cartItem);

	@Mapping(target = "productItem", ignore = true)
	@Mapping(target = "cart", ignore = true)
	CartItem toEntity(CartItemDTO cartItemDTO);
}
