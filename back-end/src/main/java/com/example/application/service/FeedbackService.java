package com.example.application.service;

import com.example.application.dto.FeedbackDTO;
import com.example.application.mapper.FeedbackMapper;
import com.example.application.repository.FeedbackRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class FeedbackService {
    FeedbackRepository feedbackRepository;

    public List<FeedbackDTO> getFeedbacksByProductId(Long productId) {
        var feedbacks = feedbackRepository.findByProductId(productId);
        return feedbacks.stream().map(FeedbackMapper.INSTANCE::toDTO).collect(Collectors.toList());
    }
}
