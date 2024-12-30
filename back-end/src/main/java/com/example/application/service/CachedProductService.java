package com.example.application.service;

import com.example.application.dto.ProductDTO;
import com.example.application.entity.Product;
import com.example.application.mapper.ProductMapper;
import com.example.application.repository.ProductRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CachedProductService {

    private final ProductRepository productRepository;

    public CachedProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Cacheable(cacheNames = "productList", key = "'products'")
    public List<ProductDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                       .map(ProductMapper.INSTANCE::toDTO)
                       .collect(Collectors.toList());
    }
}