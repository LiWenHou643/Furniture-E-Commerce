package com.example.application.service;

import com.example.application.dto.FeedbackDTO;
import com.example.application.dto.ProductDTO;
import com.example.application.entity.User;
import com.example.application.exception.ResourceNotFoundException;
import com.example.application.mapper.FeedbackMapper;
import com.example.application.mapper.ProductMapper;
import com.example.application.repository.FeedbackRepository;
import com.example.application.repository.ProductItemRepository;
import com.example.application.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.cache.annotation.CachePut;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class FeedbackService {
    private static final String PRODUCT_CACHE_KEY = "product";
    FeedbackRepository feedbackRepository;
    private final ProductItemRepository productItemRepository;
    private final ProductRepository productRepository;

    public List<FeedbackDTO> getFeedbacksByProductId(Long productId) {
        var feedbacks = feedbackRepository.findByProductId(productId);
        return feedbacks.stream().map(FeedbackMapper.INSTANCE::toDTO).collect(Collectors.toList());
    }

    @CachePut(cacheNames = PRODUCT_CACHE_KEY, key = "#result.productId")
    @Transactional
    public ProductDTO saveFeedback(Long userId, FeedbackDTO feedbackDTO) {
        var feedback = FeedbackMapper.INSTANCE.toEntity(feedbackDTO);
        feedback.setUser(User.builder().userId(userId).build());
        var product = productRepository.findById(feedbackDTO.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", feedbackDTO.getProductId()));

        var productItem = product.getProductItems().stream()
                                 .filter(item -> item.getProductItemId().equals(feedbackDTO.getProductItemId()))
                                 .findFirst()
                                 .orElseThrow(() -> new ResourceNotFoundException("Product item", "id", feedbackDTO.getProductItemId()));

        var oldRatingCount = product.getRatingCount();
        var oldAverageRating = product.getAverageRating();
        var newRatingCount = oldRatingCount + 1;
        var newAverageRating = (oldAverageRating * oldRatingCount + feedback.getRating()) / newRatingCount;

        product.setRatingCount(newRatingCount);
        product.setAverageRating(newAverageRating);

        feedback.setProductItem(productItem);

        // Save feedback
        var savedFeedback = feedbackRepository.save(feedback);

        // Return updated product as DTO
        var productDTO = ProductMapper.INSTANCE.toDTO(product);
        productDTO.getFeedbacks().add(FeedbackMapper.INSTANCE.toDTO(savedFeedback));
        return productDTO;
    }
}
