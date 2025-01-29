package com.example.application.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.application.dto.ProductDTO;
import com.example.application.dto.ProductImageDTO;
import com.example.application.dto.ProductItemDTO;
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
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class ProductService {
    private static final String PRODUCT_LIST_CACHE_KEY = "productList";
    private static final String PRODUCT_CACHE_KEY = "product";

    Cloudinary cloudinary;
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
    @Caching(
            evict = {
                    @CacheEvict(cacheNames = PRODUCT_LIST_CACHE_KEY, allEntries = true)
            },
            put = {
                    @CachePut(cacheNames = PRODUCT_CACHE_KEY, key = "#result.productId")
            }
    )
    @Transactional // Ensures the operation is atomic
    public ProductDTO addProduct(ProductDTO productDTO) throws IOException {
        Category category = categoryRepository.findById(productDTO.getCategoryId())
                                              .orElseThrow(() -> new ResourceNotFoundException(
                                                      "Category", "id", productDTO.getCategoryId()));

        Brand brand = brandRepository.findById(productDTO.getBrandId())
                                     .orElseThrow(() -> new ResourceNotFoundException(
                                             "Brand", "id", productDTO.getBrandId()));

        Material material = materialRepository.findById(productDTO.getMaterialId())
                                              .orElseThrow(() -> new ResourceNotFoundException(
                                                      "Material", "id", productDTO.getMaterialId()));

        // Upload images to Cloudinary and update productDTO with secure URLs
        for (ProductItemDTO productItem : productDTO.getProductItems()) {
            for (ProductImageDTO productImage : productItem.getProductImages()) {
                if (productImage.getFile() != null) {
                    var uploadResult = cloudinary.uploader().upload(
                            productImage.getFile().getBytes(),
                            ObjectUtils.asMap("folder", "Products/")
                    );

                    String secureUrl = (String) uploadResult.get("secure_url");
                    productImage.setImageId(null); // Remove image ID
                    productImage.setImageUrl(secureUrl); // Replace file with URL
                    productImage.setFile(null); // Remove file data to avoid sending it further
                }
            }
        }

        // Map the DTO to an entity
        Product product = ProductMapper.INSTANCE.toEntity(productDTO);  // Map DTO to entity
        product.setCategory(category);
        product.setBrand(brand);
        product.setMaterial(material);
        product.getProductItems().forEach(pi -> {
            pi.setProduct(product);  // Set the product for each product item
            pi.setProductImages(pi.getProductImages().stream()
                                  .peek(piImage -> piImage.setProductItem(pi))  // Set the product item for each image
                                  .collect(Collectors.toSet()));
        });  // Set the product for each product item

        productRepository.save(product);  // Save the new product
        return ProductMapper.INSTANCE.toDTO(product);  // Return the DTO
    }

    // Cache the individual product and evict the product list cache on update
    @Caching(
            evict = {
                    @CacheEvict(cacheNames = PRODUCT_LIST_CACHE_KEY, allEntries = true)
            },
            put = {
                    @CachePut(cacheNames = PRODUCT_CACHE_KEY, key = "#result.productId")
            }
    )
    @Transactional  // Ensures the update operation is atomic
    public ProductDTO updateProduct(ProductDTO productDTO) {
        Product product = productRepository.findById(productDTO.getProductId())
                                           .orElseThrow(() -> new IllegalArgumentException(
                                                   "Product with id " + productDTO.getProductId() + " not found"));

        if (productDTO.getCategoryId() != null) {
            Category category = categoryRepository.findById(productDTO.getCategoryId())
                                                  .orElseThrow(() -> new ResourceNotFoundException(
                                                          "Category", "id", productDTO.getCategoryId()));
            product.setCategory(category);
        }

        if (productDTO.getBrandId() != null) {
            Brand brand = brandRepository.findById(productDTO.getBrandId())
                                         .orElseThrow(() -> new ResourceNotFoundException(
                                                 "Brand", "id", productDTO.getBrandId()));
            product.setBrand(brand);
        }

        if (productDTO.getMaterialId() != null) {
            Material material = materialRepository.findById(productDTO.getMaterialId())
                                                  .orElseThrow(() -> new ResourceNotFoundException(
                                                          "Material", "id", productDTO.getMaterialId()));
            product.setMaterial(material);
        }

        product.setProductName(productDTO.getProductName());
        product.setProductDescription(productDTO.getProductDescription());

        productRepository.save(product);  // Save the updated product
        return ProductMapper.INSTANCE.toDTO(product);  // Return the updated DTO
    }


    @CacheEvict(cacheNames = PRODUCT_LIST_CACHE_KEY, allEntries = true)
    @Transactional
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                                           .orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));
        product.setProductStatus(false);  // Set the product status to false
        productRepository.save(product);  // Save the updated product
    }

    @Caching(put = {
            @CachePut(cacheNames = PRODUCT_LIST_CACHE_KEY + "-top-features", key = "#result")
    })
    public List<ProductDTO> getTopFeatureProducts() {
        List<Product> products = productRepository.findTopFeatureProducts()
                                                  .orElse(Collections.emptyList());

        return products.stream()
                       .map((ProductMapper.INSTANCE::toDTO))
                       .collect(Collectors.toList());
    }
}
