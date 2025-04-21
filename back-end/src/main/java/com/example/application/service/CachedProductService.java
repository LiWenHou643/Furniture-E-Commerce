package com.example.application.service;

import com.example.application.dto.ProductDTO;
import com.example.application.entity.Product;
import com.example.application.mapper.ProductMapper;
import com.example.application.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class CachedProductService {
    private static final String PRODUCT_LIST_CACHE_KEY = "productList";

    ProductRepository productRepository;
    ProductMapper productMapper;

    @Cacheable(cacheNames = PRODUCT_LIST_CACHE_KEY, key = "#categories + ':' + #brands + ':' + #materials + ':' + #minPrice + ':' + #maxPrice + ':' + #minRating")
    public List<ProductDTO> getFilteredProducts(
            List<String> categories,
            List<String> brands,
            List<String> materials,
            Double minPrice,
            Double maxPrice,
            Integer minRating
    ) {
        List<Product> products = productRepository.findFilteredProductsWithVariations(categories, brands, materials, minPrice, maxPrice, minRating);
        return products.stream()
                       .map(productMapper::toDTO)
                       .collect(Collectors.toList());
    }
}