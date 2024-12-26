package com.example.application.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "brands")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class Brand extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long brandId;

    @Column(nullable = false)
    String brandName;

    String brandDescription;

//    @Builder.Default
//    @OneToMany(mappedBy = "brand")
//    Set<Product> products = new HashSet<>();

}
