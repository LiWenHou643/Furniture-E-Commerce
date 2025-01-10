package com.example.application.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class OrderDetailDTO {

    Long orderDetailId;

    Long productId;

    String productName;

    String colorType;

    Long productItemId;

    Integer quantity;

    Double price;

    Double total;

}
