package com.example.application.service;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.application.dto.CartDTO;
import com.example.application.dto.CartItemDTO;
import com.example.application.entity.CartItem;
import com.example.application.exception.ResourceNotFoundException;
import com.example.application.mapper.CartItemMapper;
import com.example.application.mapper.CartMapper;
import com.example.application.repository.CartRepository;
import com.example.application.repository.OrderRepository;
import com.example.application.repository.ProductItemRepository;

import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CartService {

	CartRepository cartRepository;
	ProductItemRepository productItemRepository;
	OrderRepository orderRepository;
	CartMapper cartMapper;
	CartItemMapper cartItemMapper;

	public CartDTO getCartByUserId(Long userId) {
		// Fetch the cart by userId, or throw an exception if not found
		var cart = cartRepository.findByUser_UserId(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Cart", "userId", userId));

		var cartItemsDTO = cart.getCartItems().stream().map(cartItemMapper::toDTO)
				.collect(Collectors.toList());

		// Sort cart items by created date in descending order
		var cartDTO = cartMapper.toDTO(cart);

		cartItemsDTO.sort((item1, item2) -> item2.getCreatedAt().compareTo(item1.getCreatedAt()));
		cartDTO.setCartItems(cartItemsDTO);

		return cartDTO;
	}

	public CartDTO addItemToCart(Long userId, CartItemDTO cartItemDTO) {
		var cart = cartRepository.findByUser_UserId(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Cart", "userId", userId));

		var cartItem = cart.getCartItems().stream()
				.filter(item -> item.getProductItem().getProductItemId().equals(cartItemDTO.getProductItemId()))
				.findFirst();

		if (cartItem.isPresent()) {
			// Update item in cart
			cartItem.get().setQuantity(cartItem.get().getQuantity() + cartItemDTO.getQuantity());
			var savedCart = cartRepository.save(cart);

			return cartMapper.toDTO(savedCart);
		}

		// Add item to cart
		var productItem = productItemRepository.findById(cartItemDTO.getProductItemId())
				.orElseThrow(() -> new ResourceNotFoundException("ProductItem", "id", cartItemDTO.getProductItemId()));

		var newCartItem = CartItem.builder().cart(cart).productItem(productItem).quantity(cartItemDTO.getQuantity())
				.build();

		cart.getCartItems().add(newCartItem);

		var savedCart = cartRepository.save(cart);

		return cartMapper.toDTO(savedCart);
	}

	public CartDTO updateItemInCart(Long userId, CartItemDTO cartItemDTO) {
		var cart = cartRepository.findByUser_UserId(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Cart", "userId", userId));

		var cartItem = cart.getCartItems().stream()
				.filter(item -> item.getCartItemId().equals(cartItemDTO.getCartItemId())).findFirst()
				.orElseThrow(() -> new ResourceNotFoundException("CartItem", "itemId", cartItemDTO.getCartItemId()));

		// Update quantity or change variants based on input
		if (cartItemDTO.getQuantity() != null && cartItemDTO.getQuantity() > 0) {
			cartItem.setQuantity(cartItemDTO.getQuantity());
		} else if (cartItemDTO.getProductItemId() != null) {
			var productItem = productItemRepository.findById(cartItemDTO.getProductItemId()).orElseThrow(
					() -> new ResourceNotFoundException("ProductItem", "id", cartItemDTO.getProductItemId()));
			cartItem.setProductItem(productItem);
		}

		var savedCart = cartRepository.save(cart);

		return cartMapper.toDTO(savedCart);
	}

	public CartDTO removeItemFromCart(Long userId, Long cartItemId) {
		var cart = cartRepository.findByUser_UserId(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Cart", "userId", userId));

		// Remove item from cart
		cart.getCartItems().removeIf(item -> item.getCartItemId().equals(cartItemId));

		var savedCart = cartRepository.save(cart);

		return cartMapper.toDTO(savedCart);
	}

	@Transactional
	public CartDTO removeItemsFromCart(Long userId, Long orderId) {
		var cart = cartRepository.findByUser_UserId(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Cart", "user id", userId));

		var order = orderRepository.findById(orderId)
				.orElseThrow(() -> new ResourceNotFoundException("Order", "id", orderId));

		Set<Long> productItemIdsToRemove = order.getOrderDetails().stream()
				.map(orderItem -> orderItem.getProductItem().getProductItemId()).collect(Collectors.toSet());

		if (productItemIdsToRemove.isEmpty()) {
			return cartMapper.toDTO(cart); // Return early if there are no items to remove
		}

		// Use a HashSet for O(1) lookup instead of O(n) stream operations
		cart.getCartItems().removeIf(item -> productItemIdsToRemove.contains(item.getProductItem().getProductItemId()));

		var savedCart = cartRepository.save(cart);
		return cartMapper.toDTO(savedCart);
	}

	public CartDTO removeAllItemsFromCart(Long userId) {
		var cart = cartRepository.findByUser_UserId(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Cart", "userId", userId));

		// Remove all items from cart
		cart.getCartItems().clear();

		var savedCart = cartRepository.save(cart);

		return cartMapper.toDTO(savedCart);
	}
}
