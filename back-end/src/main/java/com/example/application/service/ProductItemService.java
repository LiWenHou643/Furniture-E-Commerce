package com.example.application.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;
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
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ProductItemService {
	private static final String PRODUCT_LIST_CACHE_KEY = "productList";
	private static final String PRODUCT_CACHE_KEY = "product";

	ProductItemRepository productItemRepository;
	ProductRepository productRepository;
	Cloudinary cloudinary;

	public ProductItemDTO getProductItemById(Long id) {
		return ProductItemMapper.INSTANCE.toDTO(productItemRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("ProductItem", "id", id)));
	}

	public List<ProductItemDTO> getAllProductItemsByIds(List<Long> ids) {
		return productItemRepository.findAllById(ids).stream().map(ProductItemMapper.INSTANCE::toDTO)
				.collect(Collectors.toList());
	}

	@Caching(evict = { @CacheEvict(value = PRODUCT_LIST_CACHE_KEY, allEntries = true),
			@CacheEvict(value = PRODUCT_CACHE_KEY, key = "#result.productId") })
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

		ProductItemDTO saved = ProductItemMapper.INSTANCE.toDTO(productItemRepository.save(productItem));
		log.info("ProductItem saved with product id: {}", saved.getProductId());
		return saved;
	}

	@Caching(evict = { @CacheEvict(value = PRODUCT_LIST_CACHE_KEY, allEntries = true),
			@CacheEvict(value = PRODUCT_CACHE_KEY, key = "#productItemDTO.productId") })
	@Transactional
	public ProductItemDTO updateProductItem(ProductItemDTO productItemDTO) throws IOException {
		ProductItem productItem = productItemRepository.findById(productItemDTO.getProductItemId()).orElseThrow(
				() -> new ResourceNotFoundException("ProductItem", "id", productItemDTO.getProductItemId()));

		productItem.setColor(ColorMapper.INSTANCE.toEntity(productItemDTO.getColor()));
		productItem.setSku(productItemDTO.getSku());
		productItem.setOriginalPrice(productItemDTO.getOriginalPrice());
		productItem.setSalePrice(productItemDTO.getSalePrice());
		productItem.setStockQuantity(productItemDTO.getStockQuantity());

		// Update for productImages in this service
		// 1. Update existing images (main image status) and remove deleted images
		// Update image URLs in the database
		if (productItemDTO.getProductImages() != null && !productItemDTO.getProductImages().isEmpty()) {
			// Create a map for fast lookup of existing images by imageId
			Map<Long, ProductImage> existingImagesMap = productItem.getProductImages().stream()
					.collect(Collectors.toMap(ProductImage::getImageId, image -> image));

			// Keep track of which images need to be deleted from the current product
			Set<Long> frontEndImageIds = productItemDTO.getProductImages().stream().map(ProductImageDTO::getImageId)
					.collect(Collectors.toSet());

			// Iterate over the incoming images from the front end
			for (ProductImageDTO productImageDTO : productItemDTO.getProductImages()) {
				Long imageId = productImageDTO.getImageId();

				if (imageId != null) {
					// If the image already exists, update it
					ProductImage existingImage = existingImagesMap.get(imageId);
					if (existingImage != null) {
						// Update main image status in case it has changed
						existingImage.setMainImage(productImageDTO.isMainImage());
					}
				}
			}

			// Remove any images that are not in the front-end list anymore
			List<ProductImage> imagesToRemove = productItem.getProductImages().stream()
					.filter(image -> !frontEndImageIds.contains(image.getImageId())).collect(Collectors.toList());

			productItem.getProductImages().removeAll(imagesToRemove);
			log.info("Existing images: {}", existingImagesMap);
			log.info("Front end images: {}", frontEndImageIds);
			log.info("Images to remove: {}", imagesToRemove);
		}

		// 2. Add new images
		// Upload images to Cloudinary and update productDTO with secure URLs
		if (productItemDTO.getNewProductImages() != null && !productItemDTO.getNewProductImages().isEmpty()) {
			for (ProductImageDTO productImage : productItemDTO.getNewProductImages()) {
				if (productImage.getFile() != null) {
					var uploadResult = cloudinary.uploader().upload(productImage.getFile().getBytes(),
							ObjectUtils.asMap("folder", "Products/"));

					String secureUrl = (String) uploadResult.get("secure_url");
					productImage.setImageId(null); // Remove image ID
					productImage.setImageUrl(secureUrl); // Replace file with URL
					productImage.setFile(null); // Remove file data to avoid sending it further
				}
			}

			Set<ProductImage> productImageList = productItemDTO.getNewProductImages().stream()
					.map(ProductImageMapper.INSTANCE::toEntity).collect(Collectors.toSet());

			productImageList.forEach(productImage -> productImage.setProductItem(productItem));
			productItem.getProductImages().addAll(productImageList);
		}

		// Initialize variables to track main images and the first image.
		int mainImageCount = 0;
		ProductImage firstImage = null;

		// Single iteration to handle both conditions
		for (ProductImage image : productItem.getProductImages()) {
			if (firstImage == null) {
				firstImage = image; // Capture the first image
			}

			if (image.isMainImage()) {
				mainImageCount++;
			}
		}

		// 3. If no main image is set, set the first image as the main image
		if (mainImageCount == 0 && firstImage != null) {
			firstImage.setMainImage(true);
		}

		// 4. If more than 1 main image is set, set only the first one as the main image
		if (mainImageCount > 1) {
			for (ProductImage image : productItem.getProductImages()) {
				if (image.isMainImage() && !image.equals(firstImage)) {
					image.setMainImage(false);
				}
			}
		}

		return ProductItemMapper.INSTANCE.toDTO(productItemRepository.save(productItem));
	}

	@Caching(evict = { @CacheEvict(value = PRODUCT_LIST_CACHE_KEY, allEntries = true),
			@CacheEvict(value = PRODUCT_CACHE_KEY, key = "#result.productId") })
	@Transactional
	public ProductItemDTO deleteProductItem(Long id) {
		ProductItem productItem = productItemRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("ProductItem", "id", id));

		productItem.setProductItemStatus(false);

		var productItemDTO = ProductItemMapper.INSTANCE.toDTO(productItemRepository.save(productItem));

		return productItemDTO;
	}

}
