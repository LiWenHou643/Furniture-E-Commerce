package com.example.application.service;

import com.example.application.dto.ProductDTO;
import com.example.application.entity.Brand;
import com.example.application.entity.Category;
import com.example.application.entity.Material;
import com.example.application.entity.Product;
import com.example.application.exception.ResourceNotFoundException;
import com.example.application.mapper.ProductMapper;
import com.example.application.repository.BrandRepository;
import com.example.application.repository.CategoryRepository;
import com.example.application.repository.MaterialRepository;
import com.example.application.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class ProductService {
    private static final String PRODUCT_LIST_CACHE_KEY = "productList";
    private static final String PRODUCT_CACHE_KEY = "product";

    ProductRepository productRepository;
    CategoryRepository categoryRepository;
    BrandRepository brandRepository;
    MaterialRepository materialRepository;

    // Cache the entire product list
    @Cacheable(cacheNames = PRODUCT_LIST_CACHE_KEY)
    public List<ProductDTO> getProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                       .map(ProductMapper.INSTANCE::toDTO)
                       .collect(Collectors.toList());
    }

    // Cache the individual product
    @Cacheable(cacheNames = PRODUCT_CACHE_KEY, key = "#id")
    public ProductDTO getProduct(Long id) {
        Product product = productRepository.findById(id)
                                           .orElseThrow(() -> new ResourceNotFoundException("Item", "id", id));
        return ProductMapper.INSTANCE.toDTO(product);
    }

    // Cache the individual product and evict the product list cache on add
    @Caching(
            evict = {@CacheEvict(cacheNames = PRODUCT_LIST_CACHE_KEY, allEntries = true)},
            put = {@CachePut(cacheNames = PRODUCT_CACHE_KEY, key = "#result.productId")}
    )
    @Transactional // Ensures the operation is atomic
    public ProductDTO addProduct(ProductDTO productDTO) {
        Category category = categoryRepository.findById(productDTO.getCategoryId())
                                              .orElseThrow(() -> new ResourceNotFoundException(
                                                      "Category", "id", productDTO.getCategoryId()));

        Brand brand = brandRepository.findById(productDTO.getBrandId())
                                     .orElseThrow(() -> new ResourceNotFoundException(
                                             "Brand", "id", productDTO.getBrandId()));

        Material material = materialRepository.findById(productDTO.getMaterialId())
                                              .orElseThrow(() -> new ResourceNotFoundException(
                                                      "Material", "id", productDTO.getMaterialId()));

        Product product = Product.builder()
                                 .productName(productDTO.getProductName())
                                 .productDescription(productDTO.getProductDescription())
                                 .category(category)
                                 .brand(brand)
                                 .material(material)
                                 .build();

        productRepository.save(product);  // Save the new product
        return ProductMapper.INSTANCE.toDTO(product);  // Return the DTO
    }

    // Cache the individual product and evict the product list cache on update
    @Caching(
            evict = {@CacheEvict(cacheNames = PRODUCT_LIST_CACHE_KEY, allEntries = true)},
            put = {@CachePut(cacheNames = PRODUCT_CACHE_KEY, key = "#result.productId")}
    )
    @Transactional  // Ensures the update operation is atomic
    public ProductDTO updateProduct(Long id, ProductDTO productDTO) {
        Product product = productRepository.findById(id)
                                           .orElseThrow(() -> new IllegalArgumentException(
                                                   "Product with id " + id + " not found"));
        ProductMapper.INSTANCE.updateProductFromDto(productDTO, product);  // Update fields from DTO
        productRepository.save(product);  // Save the updated product
        return ProductMapper.INSTANCE.toDTO(product);  // Return the updated DTO
    }

    public List<ProductDTO> searchProducts(String query) {
        List<Product> products = productRepository.findByProductNameContaining(query)
                                                  .orElse(Collections.emptyList());

        return products.stream()
                       .map(ProductMapper.INSTANCE::toDTO)
                       .collect(Collectors.toList());
    }

}
