package com.example.application.service;

import com.example.application.dto.CartDTO;
import com.example.application.dto.CartItemDTO;
import com.example.application.entity.CartItem;
import com.example.application.exception.ResourceNotFoundException;
import com.example.application.mapper.CartMapper;
import com.example.application.repository.CartRepository;
import com.example.application.repository.ProductItemRepository;
import com.example.application.repository.ProductRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CartService {

    CartRepository cartRepository;
    private final ProductItemRepository productItemRepository;
    private final ProductRepository productRepository;

    public CartDTO getCartById(Long userId) {
        var cart = cartRepository.findByUser_UserId(userId).orElseThrow(
                () -> new ResourceNotFoundException("Cart", "userId", userId)
        );

        return CartMapper.INSTANCE.toDTO(cart);
    }

    public CartDTO createCart(CartDTO cartDTO) {
        var cart = CartMapper.INSTANCE.toEntity(cartDTO);
        var savedCart = cartRepository.save(cart);

        return CartMapper.INSTANCE.toDTO(savedCart);
    }

    public CartDTO addItemToCart(Long userId, CartItemDTO cartItemDTO) {
        var cart = cartRepository.findByUser_UserId(userId).orElseThrow(
                () -> new ResourceNotFoundException("Cart", "userId", userId)
        );

        var cartItem = cart.getCartItems().stream()
                           .filter(item -> item.getProduct().getProductId().equals(cartItemDTO.getProductId()))
                           .findFirst();

        if (cartItem.isPresent()) {
            // Update item in cart
            cartItem.get().setQuantity(cartItem.get().getQuantity() + cartItemDTO.getQuantity());
            var savedCart = cartRepository.save(cart);

            return CartMapper.INSTANCE.toDTO(savedCart);
        }

        // Add item to cart
        var productItem = productRepository.findById(cartItemDTO.getProductId()).orElseThrow(
                () -> new ResourceNotFoundException("ProductItem", "id", cartItemDTO.getProductId())
        );

        var newCartItem = CartItem.builder()
                               .cart(cart)
                               .product(productItem)
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
                           .filter(item -> item.getProduct().getProductId().equals(cartItemDTO.getProductId()))
                           .findFirst()
                           .orElseThrow(
                                   () -> new ResourceNotFoundException("CartItem", "itemId", cartItemDTO.getCartItemId())
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
        cart.getCartItems().removeIf(item -> item.getProduct().getProductId().equals(itemId));

        var savedCart = cartRepository.save(cart);

        return CartMapper.INSTANCE.toDTO(savedCart);
    }

}
