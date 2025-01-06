package com.example.application.service;

import com.example.application.dto.ProductItemDTO;
import com.example.application.entity.Color;
import com.example.application.entity.Product;
import com.example.application.entity.ProductImage;
import com.example.application.entity.ProductItem;
import com.example.application.exception.ResourceNotFoundException;
import com.example.application.mapper.ProductImageMapper;
import com.example.application.mapper.ProductItemMapper;
import com.example.application.repository.ColorRepository;
import com.example.application.repository.ProductItemRepository;
import com.example.application.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class ProductItemService {
    ProductItemRepository productItemRepository;
    private final ProductRepository productRepository;
    private final ColorRepository colorRepository;

    public List<ProductItemDTO> getAllProductItems() {
        return productItemRepository.findAll().stream().map(
                ProductItemMapper.INSTANCE::toDTO
        ).collect(Collectors.toList());
    }

    public ProductItemDTO getProductItemById(Long id) {
        return ProductItemMapper.INSTANCE.toDTO(productItemRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("ProductItem", "id", id)));
    }

    public ProductItemDTO addProductItem(ProductItemDTO productItemDTO) {
        Product product = productRepository.findById(productItemDTO.getProductId()).orElseThrow(
                () -> new ResourceNotFoundException("Product", "id", productItemDTO.getProductId()));

        Color color = colorRepository.findById(productItemDTO.getColorId()).orElseThrow(
                () -> new ResourceNotFoundException("Color", "id", productItemDTO.getColorId()));

        Set<ProductImage> productImageList = productItemDTO.getProductImages().stream()
                                                          .map(ProductImageMapper.INSTANCE::toEntity)
                                                          .collect(Collectors.toSet());

        ProductItem productItem = ProductItem.builder()
                                             .product(product)
                                             .color(color)
                                             .sku(productItemDTO.getSku())
                                             .originalPrice(productItemDTO.getOriginalPrice())
                                             .salePrice(productItemDTO.getSalePrice())
                                             .stockQuantity(productItemDTO.getStockQuantity())
                                             .productImages(productImageList)
                                             .build();

        productImageList.forEach(productImage -> productImage.setProductItem(productItem));

        return ProductItemMapper.INSTANCE.toDTO(productItemRepository.save(productItem));
    }

    public ProductItemDTO updateProductItem(ProductItemDTO productItemDTO) {
        ProductItem productItem = productItemRepository.findById(productItemDTO.getProductItemId()).orElseThrow(
                () -> new ResourceNotFoundException("ProductItem", "id", productItemDTO.getProductItemId()));

        Product product = productRepository.findById(productItemDTO.getProductId()).orElseThrow(
                () -> new ResourceNotFoundException("Product", "id", productItemDTO.getProductId()));


        Color color = colorRepository.findById(productItemDTO.getColorId()).orElseThrow(
                () -> new ResourceNotFoundException("Color", "id", productItemDTO.getColorId()));

        productItem.setProduct(product);
        productItem.setColor(color);
        productItem.setSku(productItemDTO.getSku());
        productItem.setOriginalPrice(productItemDTO.getOriginalPrice());
        productItem.setSalePrice(productItemDTO.getSalePrice());
        productItem.setStockQuantity(productItemDTO.getStockQuantity());
        // No update for productImages in this service

        return ProductItemMapper.INSTANCE.toDTO(productItemRepository.save(productItem));
    }
}
