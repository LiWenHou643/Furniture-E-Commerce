package com.example.application.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.UuidGenerator;

@Entity
@Table(name = "materials")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class Material extends BaseEntity {
    @Id
    @UuidGenerator
    String materialId;

    String materialName;

    String materialDescription;

//    @Builder.Default
//    @OneToMany(mappedBy = "material")
//    Set<Product> products = new HashSet<>();
}
