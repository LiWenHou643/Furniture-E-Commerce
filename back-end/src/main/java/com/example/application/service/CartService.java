package com.example.application.service;

import com.example.application.dto.CartDTO;
import com.example.application.dto.CartItemDTO;
import com.example.application.entity.CartItem;
import com.example.application.entity.Product;
import com.example.application.exception.ResourceNotFoundException;
import com.example.application.mapper.CartMapper;
import com.example.application.repository.CartRepository;
import com.example.application.repository.ProductItemRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CartService {

    CartRepository cartRepository;
    private final ProductItemRepository productItemRepository;

    public CartDTO getCartById(Long userId) {
        var cart = cartRepository.findByUser_UserId(userId).orElseThrow(
                () -> new ResourceNotFoundException("Cart", "userId", userId)
        );



        var cartDTO = CartMapper.INSTANCE.toDTO(cart);


        return CartMapper.INSTANCE.toDTO(cart);
    }

    public CartDTO addItemToCart(Long userId, CartItemDTO cartItemDTO) {
        var cart = cartRepository.findByUser_UserId(userId).orElseThrow(
                () -> new ResourceNotFoundException("Cart", "userId", userId)
        );

        var cartItem = cart.getCartItems().stream()
                           .filter(item -> item.getProductItem().getProductItemId().equals(cartItemDTO.getProductItemId()))
                           .findFirst();

        if (cartItem.isPresent()) {
            // Update item in cart
            cartItem.get().setQuantity(cartItem.get().getQuantity() + cartItemDTO.getQuantity());
            var savedCart = cartRepository.save(cart);

            return CartMapper.INSTANCE.toDTO(savedCart);
        }

        // Add item to cart
        var productItem = productItemRepository.findById(cartItemDTO.getProductItemId()).orElseThrow(
                () -> new ResourceNotFoundException("ProductItem", "id", cartItemDTO.getProductItemId())
        );

        var newCartItem = CartItem.builder()
                                  .cart(cart)
                                  .productItem(productItem)
                                  .quantity(cartItemDTO.getQuantity())
                                  .build();

        cart.getCartItems().add(newCartItem);

        var savedCart = cartRepository.save(cart);

        return CartMapper.INSTANCE.toDTO(savedCart);
    }

    public CartDTO updateItemInCart(Long userId, CartItemDTO cartItemDTO) {
        var cart = cartRepository.findByUser_UserId(userId).orElseThrow(
                () -> new ResourceNotFoundException("Cart", "userId", userId)
        );

        // Update item in cart
        var cartItem = cart.getCartItems().stream()
                           .filter(item -> item.getProductItem().getProductItemId().equals(cartItemDTO.getProductItemId()))
                           .findFirst()
                           .orElseThrow(
                                   () -> new ResourceNotFoundException("CartItem", "itemId",
                                           cartItemDTO.getCartItemId())
                           );

        cartItem.setQuantity(cartItemDTO.getQuantity());
        var savedCart = cartRepository.save(cart);

        return CartMapper.INSTANCE.toDTO(savedCart);
    }

    public CartDTO removeItemFromCart(Long userId, Long itemId) {
        var cart = cartRepository.findByUser_UserId(userId).orElseThrow(
                () -> new ResourceNotFoundException("Cart", "userId", userId)
        );

        // Remove item from cart
        cart.getCartItems().removeIf(item -> item.getProductItem().getProductItemId().equals(itemId));

        var savedCart = cartRepository.save(cart);

        return CartMapper.INSTANCE.toDTO(savedCart);
    }

}
