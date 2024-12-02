package com.example.application.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @NotBlank(message = "Product promoCode cannot be blank")
    @Column(name = "product_code")
    String productCode;

    @NotBlank(message = "Title cannot be blank")
    String title;

    @NotBlank(message = "Image cannot be blank")
    String image;

    @NotBlank(message = "Description cannot be blank")
    String description;

    @NotNull(message = "Price cannot be null")
    @Min(value = 0, message = "Price cannot be less than 0")
    @Column(precision = 10, scale = 2)
    BigDecimal price;

    @NotNull(message = "Discount cannot be null")
    @Min(value = 0, message = "Discount cannot be less than 0")
    @Max(value = 100, message = "Discount cannot be more than 100")
    @Column(name = "discount_percentage", precision = 5, scale = 2)
    BigDecimal discountPercentage;

    @Column(name = "stock_quantity")
    int stockQuantity = 0;

    @Column(name = "sold_quantity")
    int soldQuantity = 0;

    @Column(name = "is_deleted")
    boolean deleted = false;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id", nullable = false)
    Category category;

    @OneToMany(mappedBy = "product", cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    Set<CartItem> cartItems = new HashSet<>();
}
