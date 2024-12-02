package com.example.application.service.product;

import com.example.application.dto.response.CartItemResponse;
import com.example.application.dto.response.CartResponse;
import com.example.application.entity.Cart;
import com.example.application.entity.CartItem;
import com.example.application.entity.Person;
import com.example.application.entity.Product;
import com.example.application.repository.person.PersonRepository;
import com.example.application.repository.product.CartItemRepository;
import com.example.application.repository.product.CartRepository;
import com.example.application.repository.product.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;
import java.util.stream.Collectors;

import static com.example.application.mapper.CartMapper.CART_MAPPER;

@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Service
public class CartService {
    CartRepository cartRepository;
    CartItemRepository cartItemRepository;
    ProductRepository productRepository;
    PersonRepository personRepository;

    public CartResponse getCartItems(String userName) {
        Person person = personRepository.findByEmail(userName)
                                        .orElseThrow(() -> new RuntimeException("Person not found"));
        Long personId = person.getId();

        Optional<Cart> cart = cartRepository.findByPersonId(personId);

        if (cart.isPresent()) {
            List<CartItem> cartItems = new ArrayList<>(cart.get().getCartItems());

            cartItems.sort(Comparator.comparing(CartItem::getCreatedAt, Comparator.reverseOrder()));

            List<CartItemResponse> cartItemResponses = cartItems.stream()
                                                                .map(CART_MAPPER::toCartItemResponse)
                                                                .collect(Collectors.toList());

            return new CartResponse(cart.get().getId(), personId, cartItemResponses.size(), cartItemResponses);
        }

        return null;
    }

    public Long getCartId(String userName) {
        Person person = personRepository.findByEmail(userName)
                                        .orElseThrow(() -> new RuntimeException("Person not found"));
        Long personId = person.getId();

        Optional<Cart> cart = cartRepository.findByPersonId(personId);

        return cart.map(Cart::getId).orElse(null);

    }

    public Cart getCartByPersonId(Long personId) {
        return cartRepository.findByPersonId(personId)
                             .orElseThrow(() -> new RuntimeException("Cart not found"));
    }

    @Transactional
    public String addItemToCart(Long cartId, Long productId, int quantity) {
        Product product = productRepository.findById(productId)
                                           .orElseThrow(() -> new RuntimeException("Product not found"));
        BigDecimal price = product.getPrice();
        BigDecimal discountPercent = product.getDiscountPercentage();

        Cart cart = cartRepository.findById(cartId)
                                  .orElseThrow(() -> new RuntimeException("Cart not found"));

        // Check if the cart already has the product
        CartItem existingItem = cart.getCartItems()
                                    .stream()
                                    .filter(cartItem -> cartItem.getProduct().getId().equals(productId))
                                    .findFirst()
                                    .orElse(null);

        if (existingItem != null) {
            existingItem.setQuantity(existingItem.getQuantity() + quantity);
            cartRepository.save(cart);
            return "Item updated in cart";
        } else {
            CartItem cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            cartItem.setPrice(price);
            // Convert discountPercent to BigDecimal
            BigDecimal discountBigDecimal = discountPercent
                    .divide(BigDecimal.valueOf(100), RoundingMode.HALF_UP);
            // Calculate price at time (original price minus discount)
            BigDecimal discountAmount = price.multiply(discountBigDecimal);
            BigDecimal discountedPrice = price.subtract(discountAmount);
            cartItem.setDiscountPercentage(discountPercent);
            cartItem.setDiscountedPrice(discountedPrice);
            cartItem.setTotalPrice(discountedPrice.multiply(BigDecimal.valueOf(quantity)));

            cart.getCartItems().add(cartItem);
            saveCart(cart);

            return "Item added to cart";
        }
    }

    public void updateItemInCart(Long cartItemId, int quantity) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                                              .orElseThrow(() -> new RuntimeException("Cart item not found"));
        cartItem.setQuantity(quantity);
        cartItemRepository.save(cartItem);
    }

    public void saveCart(Cart cart) {
        cartRepository.save(cart);
    }

    public void deleteCartItem(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }

    public void deleteCartItems(Long cartId, Set<CartItem> cartItems) {
        Cart cart = cartRepository.findById(cartId)
                                  .orElseThrow(() -> new RuntimeException("Cart not found"));

        cart.getCartItems().removeAll(cartItems);
        saveCart(cart);
    }

    public boolean removeItemFromCart(Long itemId) {
        Optional<CartItem> cartItemOptional = cartItemRepository.findById(itemId);
        if (cartItemOptional.isPresent()) {
            CartItem cartItem = cartItemOptional.get();
            cartItemRepository.delete(cartItem);
            return true;
        }
        return false; // Item not found
    }

    public void clearCart(Long cartId) {
        Cart cart = cartRepository.findById(cartId)
                                  .orElseThrow(() -> new RuntimeException("Cart not found"));

        // Clear all cart items
        cart.getCartItems().clear();

        // Save the cart to remove items from DB
        cartRepository.save(cart);
    }

}
