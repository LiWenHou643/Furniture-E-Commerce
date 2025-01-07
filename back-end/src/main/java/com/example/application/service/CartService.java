package com.example.application.service;

import com.example.application.dto.CartDTO;
import com.example.application.dto.CartItemDTO;
import com.example.application.entity.CartItem;
import com.example.application.exception.ResourceNotFoundException;
import com.example.application.mapper.CartMapper;
import com.example.application.repository.CartRepository;
import com.example.application.repository.ProductItemRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CartService {

    CartRepository cartRepository;
    private final ProductItemRepository productItemRepository;

    public CartDTO getCartById(Long userId) {
        // Fetch the cart by userId, or throw an exception if not found
        var cart = cartRepository.findByUser_UserId(userId)
                                 .orElseThrow(() -> new ResourceNotFoundException("Cart", "userId", userId));

        // Sort cart items by created date in descending order
        var cartDTO = CartMapper.INSTANCE.toDTO(cart);
        cartDTO.getCartItems().sort((item1, item2) -> item2.getCreatedAt().compareTo(item1.getCreatedAt()));

        return cartDTO;
    }

    public CartDTO addItemToCart(Long userId, CartItemDTO cartItemDTO) {
        var cart = cartRepository.findByUser_UserId(userId).orElseThrow(
                () -> new ResourceNotFoundException("Cart", "userId", userId)
        );

        var cartItem = cart.getCartItems().stream()
                           .filter(item -> item.getProductItemId().equals(cartItemDTO.getProductItemId()))
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
                                  .productItemId(cartItemDTO.getProductItemId())
                                  .product(productItem.getProduct())
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

        var cartItem = cart.getCartItems().stream()
                           .filter(item -> item.getCartItemId().equals(cartItemDTO.getCartItemId()))
                           .findFirst()
                           .orElseThrow(
                                   () -> new ResourceNotFoundException("CartItem", "itemId",
                                           cartItemDTO.getCartItemId())
                           );

        // Update quantity or change variants based on input
        if (cartItemDTO.getQuantity() != null && cartItemDTO.getQuantity() > 0) {
            cartItem.setQuantity(cartItemDTO.getQuantity());
        } else if (cartItemDTO.getProductItemId() != null) {
            cartItem.setProductItemId(cartItemDTO.getProductItemId());
        }

        var savedCart = cartRepository.save(cart);

        return CartMapper.INSTANCE.toDTO(savedCart);
    }

    public CartDTO removeItemFromCart(Long userId, Long cartItemId) {
        var cart = cartRepository.findByUser_UserId(userId).orElseThrow(
                () -> new ResourceNotFoundException("Cart", "userId", userId)
        );

        // Remove item from cart
        cart.getCartItems().removeIf(item -> item.getCartItemId().equals(cartItemId));

        var savedCart = cartRepository.save(cart);

        return CartMapper.INSTANCE.toDTO(savedCart);
    }

}
