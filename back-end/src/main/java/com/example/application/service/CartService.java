package com.example.application.service;

import com.example.application.dto.CartDTO;
import com.example.application.exception.ResourceNotFoundException;
import com.example.application.mapper.CartMapper;
import com.example.application.repository.CartRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CartService {

    CartRepository cartRepository;

    public CartDTO getCartById(Long id){
        var cart = cartRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Cart", "id", id)
        );

        return CartMapper.INSTANCE.toDTO(cart);
    }

}
