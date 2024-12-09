package com.example.application.service.auth;

import com.example.application.dto.ProductDTO;
import com.example.application.entity.Product;
import com.example.application.mapper.ProductMapper;
import com.example.application.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class ProductService {
    private static final String PRODUCT_LIST_CACHE_KEY = "productList";
    private static final String PRODUCT_CACHE_KEY = "product";

    ProductRepository productRepository;
    ProductMapper productMapper;

    // Cache the entire product list
    @Cacheable(cacheNames = PRODUCT_LIST_CACHE_KEY)
    public List<ProductDTO> getProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                       .map(productMapper::toDTO)
                       .collect(Collectors.toList());
    }

    // Cache the individual product and evict the product list cache on add
    @Caching(
            evict = {@CacheEvict(cacheNames = PRODUCT_LIST_CACHE_KEY, allEntries = true)},
            put = {@CachePut(cacheNames = PRODUCT_CACHE_KEY, key = "#result.productId")}
    )
    @Transactional // Ensures the operation is atomic
    public ProductDTO addProduct(ProductDTO productDTO) {
        Product product = productMapper.toProduct(productDTO);
        productRepository.save(product);  // Save the new product
        return productMapper.toDTO(product);  // Return the DTO
    }

    // Cache the individual product and evict the product list cache on update
    @Caching(
            evict = {@CacheEvict(cacheNames = PRODUCT_LIST_CACHE_KEY, allEntries = true)},
            put = {@CachePut(cacheNames = PRODUCT_CACHE_KEY, key = "#result.productId")}
    )
    @Transactional  // Ensures the update operation is atomic
    public ProductDTO updateProduct(int id, ProductDTO productDTO) {
        Product product = productRepository.findById(id)
                                           .orElseThrow(() -> new IllegalArgumentException("Product with id " + id + " not found"));
        productMapper.updateProductFromDto(productDTO, product);  // Update fields from DTO
        productRepository.save(product);  // Save the updated product
        return productMapper.toDTO(product);  // Return the updated DTO
    }
}
