package com.example.application.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CartItemDTO {
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    Long productItemId;

    Long cartItemId;
    Long cartId;
    ProductItemDTO productItemDTO;
    int quantity;
}
