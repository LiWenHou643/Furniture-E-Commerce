package com.example.application.mapper;

import com.example.application.dto.response.CartItemResponse;
import com.example.application.dto.response.CartResponse;
import com.example.application.entity.Cart;
import com.example.application.entity.CartItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface CartMapper {
    CartMapper CART_MAPPER = Mappers.getMapper(CartMapper.class);

    CartResponse toCartResponse(Cart cart);

    @Mapping(source = "product.title", target = "title")
    @Mapping(source = "product.description", target = "description")
    @Mapping(source = "product.image", target = "image")
    @Mapping(source = "product.id", target = "productId")
    CartItemResponse toCartItemResponse(CartItem cartItem);
}
