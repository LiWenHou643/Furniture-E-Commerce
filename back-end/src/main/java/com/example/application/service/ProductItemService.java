package com.example.application.service;

import java.io.IOException;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.application.dto.ProductImageDTO;
import com.example.application.dto.ProductItemDTO;
import com.example.application.entity.Product;
import com.example.application.entity.ProductImage;
import com.example.application.entity.ProductItem;
import com.example.application.exception.ResourceNotFoundException;
import com.example.application.mapper.ColorMapper;
import com.example.application.mapper.ProductImageMapper;
import com.example.application.mapper.ProductItemMapper;
import com.example.application.repository.ProductItemRepository;
import com.example.application.repository.ProductRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class ProductItemService {
	private static final String PRODUCT_LIST_CACHE_KEY = "productList";
	private static final String PRODUCT_CACHE_KEY = "product";

	ProductItemRepository productItemRepository;
	ProductRepository productRepository;
	Cloudinary cloudinary;

	public List<ProductItemDTO> getAllProductItems() {
		return productItemRepository.findAll().stream().map(ProductItemMapper.INSTANCE::toDTO)
				.collect(Collectors.toList());
	}

	public ProductItemDTO getProductItemById(Long id) {
		return ProductItemMapper.INSTANCE.toDTO(productItemRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("ProductItem", "id", id)));
	}

	public List<ProductItemDTO> getAllProductItemsByIds(List<Long> ids) {
		return productItemRepository.findAllById(ids).stream().map(ProductItemMapper.INSTANCE::toDTO)
				.collect(Collectors.toList());
	}

	@Caching(evict = { @CacheEvict(value = PRODUCT_LIST_CACHE_KEY, allEntries = true),
			@CacheEvict(value = PRODUCT_CACHE_KEY, key = "#productItemDTO.productId") })
	@Transactional
	public ProductItemDTO addProductItem(ProductItemDTO productItemDTO) throws IOException {
		Product product = productRepository.findById(productItemDTO.getProductId())
				.orElseThrow(() -> new ResourceNotFoundException("Product", "id", productItemDTO.getProductId()));

		// Upload images to Cloudinary and update productDTO with secure URLs
		for (ProductImageDTO productImage : productItemDTO.getProductImages()) {
			if (productImage.getFile() != null) {
				var uploadResult = cloudinary.uploader().upload(productImage.getFile().getBytes(),
						ObjectUtils.asMap("folder", "Products/"));

				String secureUrl = (String) uploadResult.get("secure_url");
				productImage.setImageId(null); // Remove image ID
				productImage.setImageUrl(secureUrl); // Replace file with URL
				productImage.setFile(null); // Remove file data to avoid sending it further
			}
		}

		Set<ProductImage> productImageList = productItemDTO.getProductImages().stream()
				.map(ProductImageMapper.INSTANCE::toEntity).collect(Collectors.toSet());

		ProductItem productItem = ProductItem.builder().product(product)
				.color(ColorMapper.INSTANCE.toEntity(productItemDTO.getColor())).sku(productItemDTO.getSku())
				.originalPrice(productItemDTO.getOriginalPrice()).salePrice(productItemDTO.getSalePrice())
				.stockQuantity(productItemDTO.getStockQuantity()).productImages(productImageList).build();

		productImageList.forEach(productImage -> productImage.setProductItem(productItem));

		return ProductItemMapper.INSTANCE.toDTO(productItemRepository.save(productItem));
	}

	public ProductItemDTO updateProductItem(ProductItemDTO productItemDTO) {
		ProductItem productItem = productItemRepository.findById(productItemDTO.getProductItemId()).orElseThrow(
				() -> new ResourceNotFoundException("ProductItem", "id", productItemDTO.getProductItemId()));

		productItem.setColor(ColorMapper.INSTANCE.toEntity(productItemDTO.getColor()));
		productItem.setSku(productItemDTO.getSku());
		productItem.setOriginalPrice(productItemDTO.getOriginalPrice());
		productItem.setSalePrice(productItemDTO.getSalePrice());
		productItem.setStockQuantity(productItemDTO.getStockQuantity());
		// No update for productImages in this service

		return ProductItemMapper.INSTANCE.toDTO(productItemRepository.save(productItem));
	}
}
