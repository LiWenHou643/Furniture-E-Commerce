package com.example.application.service.product;

import com.example.application.dto.request.ProductRequest;
import com.example.application.dto.response.ProductResponse;
import com.example.application.entity.Category;
import com.example.application.entity.Product;
import com.example.application.exception.AppException;
import com.example.application.exception.ErrorCode;
import com.example.application.repository.product.ProductRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.example.application.mapper.ProductMapper.PRODUCT_MAPPER;

@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Service
public class ProductService {
    CategoryService categoryService;
    ProductRepository productRepository;

    public Page<ProductResponse> getProducts(String category, int page, int size, String sort) {
        String[] sortParams = sort.split("-");
        String sortField = sortParams[0];
        Sort.Direction sortDirection = sortParams[1].equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        if (page < 1) page = 1;
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by(sortDirection, sortField));

        Page<Product> productPage;
        if (category != null && !category.isEmpty()) {
            productPage = productRepository.findAllByCategory_NameAndDeletedIsFalse(category, pageable);
        } else {
            productPage = productRepository.findAllByDeletedIsFalse(pageable);
        }
        // Map Product entities to ProductResponse DTOs
        return productPage.map(PRODUCT_MAPPER::toProductResponse);
    }

    public Page<ProductResponse> getBestSellerProducts(int limit) {
        Pageable pageable = PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "soldQuantity"));
        Page<Product> productPage = productRepository.findAllByDeletedIsFalse(pageable);
        // Map Product entities to ProductResponse DTOs
        return productPage.map(PRODUCT_MAPPER::toProductResponse);
    }

    public Page<ProductResponse> getMostDiscountProducts(int limit) {
        Pageable pageable = PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "discountPercentage"));
        Page<Product> productPage = productRepository.findAllByDeletedIsFalse(pageable);
        // Map Product entities to ProductResponse DTOs
        return productPage.map(PRODUCT_MAPPER::toProductResponse);
    }

    public List<ProductResponse> searchProducts(String title) {
        List<Product> products = productRepository.findAllByTitleContainingIgnoreCaseAndDeletedIsFalse(title);
        // Map Product entities to ProductResponse DTOs
        return products.stream()
                       .map(PRODUCT_MAPPER::toProductResponse)
                       .collect(Collectors.toList());
    }

    public ProductResponse getProductById(Long productId) {
        return PRODUCT_MAPPER.toProductResponse(productRepository.findByIdAndDeletedIsFalse(productId)
                                                                 .orElseThrow(() -> new AppException(
                                                                         ErrorCode.PRODUCT_NOT_FOUND)));
    }

    public ProductResponse addProduct(ProductRequest productRequest) {
        boolean isProductExist = productRepository.existsByProductCode(productRequest.productCode());
        if (isProductExist) {
            throw new AppException(ErrorCode.PRODUCT_EXISTED);
        }

        // Save product to database
        Product product = PRODUCT_MAPPER.toProductEntity(productRequest);
        Category category = categoryService.getCategoryById(productRequest.categoryId());
        product.setCategory(category);
        productRepository.save(product);

        return PRODUCT_MAPPER.toProductResponse(product);
    }

    public ProductResponse updateProduct(ProductRequest productRequest) {
        Product product = productRepository.findById(productRequest.id())
                                           .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        product.setProductCode(productRequest.productCode());
        product.setTitle(productRequest.title());
        product.setPrice(productRequest.price());
        product.setDiscountPercentage(productRequest.discountPercentage());
        product.setImage(productRequest.image());
        product.setDescription(productRequest.description());
        product.setStockQuantity(productRequest.stockQuantity());
        Category category = categoryService.getCategoryById(productRequest.categoryId());
        product.setCategory(category);
        productRepository.save(product);

        return PRODUCT_MAPPER.toProductResponse(product);
    }

    public void deleteProduct(ProductRequest productRequest) {
        Product product = productRepository.findById(productRequest.id())
                                           .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        product.setDeleted(true);
        productRepository.save(product);
    }
}