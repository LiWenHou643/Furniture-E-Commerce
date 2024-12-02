package com.example.application.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@Builder
public class CartResponse {
    Long id;
    Long personId;
    int count;
    List<CartItemResponse> cartItems;
}
