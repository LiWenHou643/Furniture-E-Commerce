package com.example.application.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.application.dto.FeedbackDTO;
import com.example.application.dto.ProductDTO;
import com.example.application.entity.Feedback;
import com.example.application.entity.FeedbackImage;
import com.example.application.entity.User;
import com.example.application.exception.ResourceNotFoundException;
import com.example.application.mapper.FeedbackMapper;
import com.example.application.mapper.ProductMapper;
import com.example.application.repository.FeedbackRepository;
import com.example.application.repository.OrderDetailRepository;
import com.example.application.repository.ProductRepository;

import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class FeedbackService {
	private static final String PRODUCT_LIST_CACHE_KEY = "productList";
	private static final String PRODUCT_CACHE_KEY = "product";
	FeedbackRepository feedbackRepository;
	ProductRepository productRepository;
	OrderDetailRepository orderDetailRepository;
	Cloudinary cloudinary;

	public List<FeedbackDTO> getFeedbacksByProductId(Long productId) {
		var feedbacks = feedbackRepository.findByProductId(productId);
		return feedbacks.stream().map(FeedbackMapper.INSTANCE::toDTO).collect(Collectors.toList());
	}

	@Caching(evict = { @CacheEvict(value = PRODUCT_LIST_CACHE_KEY, allEntries = true),
			@CacheEvict(value = PRODUCT_CACHE_KEY, key = "#result.productId") })
	@Transactional
	public ProductDTO saveFeedback(Long userId, FeedbackDTO feedbackDTO, MultipartFile[] files) {
		System.out.println("FeedbackDTO: " + feedbackDTO.toString());

		var feedback = Feedback.builder().rating(feedbackDTO.getRating()).comment(feedbackDTO.getComment()).build();

		feedback.setUser(User.builder().userId(userId).build());
		var product = productRepository.findById(feedbackDTO.getProductId())
				.orElseThrow(() -> new ResourceNotFoundException("Product", "id", feedbackDTO.getProductId()));

		var productItem = product.getProductItems().stream()
				.filter(item -> item.getProductItemId().equals(feedbackDTO.getProductItemId())).findFirst()
				.orElseThrow(() -> new ResourceNotFoundException("Product item", "id", feedbackDTO.getProductItemId()));

		var orderDetail = orderDetailRepository.findById(feedbackDTO.getOrderDetailId()).orElseThrow(
				() -> new ResourceNotFoundException("Order detail", "productItemId", feedbackDTO.getOrderDetailId()));

		var oldRatingCount = product.getRatingCount();
		var oldAverageRating = product.getAverageRating();
		var newRatingCount = oldRatingCount + 1;
		var newAverageRating = (oldAverageRating * oldRatingCount + feedback.getRating()) / newRatingCount;

		product.setRatingCount(newRatingCount);
		product.setAverageRating(newAverageRating);

		feedback.setProductItem(productItem);

		// Save feedback images
		if (files != null && files.length > 0) {
			for (MultipartFile file : files) {
				try {
					// Upload the image to Cloudinary
					Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());

					// Get the URL of the uploaded image
					String imageUrl = (String) uploadResult.get("secure_url");
					System.out.println("Uploaded image URL: " + imageUrl);

					// Save the image URL to the feedback
					feedback.getFeedbackImages()
							.add(FeedbackImage.builder().imageUrl(imageUrl).feedback(feedback).build());

					// You can save the URL to your database or use it as needed
				} catch (IOException e) {
					e.printStackTrace();
					// Handle the error (e.g., log it or throw an exception)
				}
			}
		}

		// Save feedback
		var savedFeedback = feedbackRepository.save(feedback);

		// Save feedback given status to order detail item
		orderDetail.setFeedbackGiven(true);
		orderDetailRepository.save(orderDetail);

		// Return updated product as DTO
		var productDTO = ProductMapper.INSTANCE.toDTO(product);
		if (productDTO.getFeedbacks() == null) {
			productDTO.setFeedbacks(new ArrayList<>());
		}

		productDTO.getFeedbacks().add(FeedbackMapper.INSTANCE.toDTO(savedFeedback));
		return productDTO;
	}
}
