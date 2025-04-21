package com.example.application.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.application.dto.CartItemDTO;
import com.example.application.entity.CartItem;

@Mapper(componentModel = "spring", 
uses = { BrandMapper.class, 
		CategoryMapper.class, 
		MaterialMapper.class, 
		ProductMapper.class,
		ProductItemMapper.class })
public interface CartItemMapper {
	@Mapping(target = "product", source = "productItem.product")
	@Mapping(target = "productItemId", source = "productItem.productItemId")
	CartItemDTO toDTO(CartItem cartItem);

	@Mapping(target = "productItem", ignore = true)
	@Mapping(target = "cart", ignore = true)
	CartItem toEntity(CartItemDTO cartItemDTO);
}
