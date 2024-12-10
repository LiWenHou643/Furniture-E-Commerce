package com.example.application.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Entity
@Table(name = "sub_categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class SubCategory extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long subCategoryId;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    Category category;  // Many sub-categories belong to one category

    @Column(name = "sub_category_name", nullable = false)
    String subCategoryName;

    @Column(name = "sub_category_description")
    String subCategoryDescription;

    // One sub-category can have many products
    @OneToMany(mappedBy = "subCategory")
    List<Product> products;

}
