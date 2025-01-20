package com.example.application.controller;

import com.example.application.dto.ApiResponse;
import com.example.application.dto.FeedbackDTO;
import com.example.application.service.FeedbackService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class FeedbackController {

    FeedbackService feedbackService;

    @GetMapping("/feedbacks")
    public ResponseEntity<ApiResponse<?>> getFeedbacksByProductId(@RequestParam Long productId) {
        return ResponseEntity.ok(
                ApiResponse.builder()
                           .status("success")
                           .data(feedbackService.getFeedbacksByProductId(productId))
                           .message("Feedbacks retrieved successfully")
                           .build()
        );
    }

    @PostMapping("/feedbacks")
    public ResponseEntity<ApiResponse<?>> saveFeedback(@RequestBody FeedbackDTO feedbackDTO) {
        var userId = getUserId();
        return ResponseEntity.ok(
                ApiResponse.builder()
                           .status("success")
                           .data(feedbackService.saveFeedback(userId, feedbackDTO))
                           .message("Feedback saved successfully")
                           .build()
        );
    }

    private Long getUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (Long) (authentication).getDetails();
    }
}
