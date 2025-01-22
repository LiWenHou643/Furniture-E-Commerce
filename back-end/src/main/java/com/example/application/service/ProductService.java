package com.example.application.service;

import com.example.application.dto.ProductDTO;
import com.example.application.entity.Brand;
import com.example.application.entity.Category;
import com.example.application.entity.Material;
import com.example.application.entity.Product;
import com.example.application.exception.ResourceNotFoundException;
import com.example.application.mapper.FeedbackMapper;
import com.example.application.mapper.ProductMapper;
import com.example.application.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
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

    // Inject the cached product service
    CachedProductService cachedProductService;
    private final FeedbackRepository feedbackRepository;

    public Page<ProductDTO> getProducts(
            List<String> categories,
            List<String> brands,
            List<String> materials,
            Double minPrice,
            Double maxPrice,
            Integer minRating,
            String keyword,
            Pageable pageable
    ) {
        List<ProductDTO> products = cachedProductService.getFilteredProducts(categories, brands, materials, minPrice,
                maxPrice, minRating);

        // Filter by keyword if it's provided
        if (keyword != null && !keyword.trim().isEmpty()) {
            String lowerCaseKeyword = keyword.toLowerCase(); // Make case-insensitive
            products = products.stream()
                               .filter(product -> product.getProductName().toLowerCase().contains(lowerCaseKeyword))
                               .toList();
        }

        // Paginate the list
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), products.size());
        List<ProductDTO> paginatedContent = products.subList(start, end);

        return new PageImpl<>(paginatedContent, pageable, products.size());
    }


    // Cache the individual product
    @Cacheable(cacheNames = PRODUCT_CACHE_KEY, key = "#id")
    public ProductDTO getProductById(Long id) {
        // Fetch the product with its product items and feedbacks in a single query
        var product = productRepository.findById(id)
                                       .orElseThrow(() -> new ResourceNotFoundException("Item", "id", id));

        // Map the product to DTO
        var productDTO = ProductMapper.INSTANCE.toDTO(product);

        // Extract feedbacks from the product items and map them to DTOs
        var feedbacks = product.getProductItems().stream()
                               .flatMap(pi -> pi.getFeedbacks().stream())
                               .map(FeedbackMapper.INSTANCE::toDTO)
                               .collect(Collectors.toList());

        productDTO.setFeedbacks(feedbacks);

        return productDTO;
    }

    // Cache the individual product and evict the product list cache on add
    @CachePut(cacheNames = PRODUCT_CACHE_KEY, key = "#result.productId")
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
                                 .averageRating(productDTO.getAverageRating())
                                 .ratingCount(productDTO.getRatingCount())
                                 .productStatus(productDTO.isProductStatus())
                                 .build();

        productRepository.save(product);  // Save the new product
        return ProductMapper.INSTANCE.toDTO(product);  // Return the DTO
    }

    // Cache the individual product and evict the product list cache on update
    @CachePut(cacheNames = PRODUCT_CACHE_KEY, key = "#result.productId")
    @Transactional  // Ensures the update operation is atomic
    public ProductDTO updateProduct(ProductDTO productDTO) {
        Product product = productRepository.findById(productDTO.getProductId())
                                           .orElseThrow(() -> new IllegalArgumentException(
                                                   "Product with id " + productDTO.getProductId() + " not found"));
        ProductMapper.INSTANCE.updateProductFromDTO(productDTO, product);  // Update fields from DTO
        productRepository.save(product);  // Save the updated product
        return ProductMapper.INSTANCE.toDTO(product);  // Return the updated DTO
    }

    public List<ProductDTO> searchProducts(String query) {
        List<Product> products = productRepository.findByProductNameContaining(query)
                                                  .orElse(Collections.emptyList());

        return products.stream()
                       .map((ProductMapper.INSTANCE::toDTO))
                       .collect(Collectors.toList());
    }

    public List<ProductDTO> getTopFeatureProducts() {
        List<Product> products = productRepository.findTopFeatureProducts()
                                                  .orElse(Collections.emptyList());

        return products.stream()
                       .map((ProductMapper.INSTANCE::toDTO))
                       .collect(Collectors.toList());
    }
}
