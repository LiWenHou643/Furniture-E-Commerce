package com.example.application.controller;

import com.example.application.dto.ApiResponse;
import com.example.application.service.FeedbackService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
}
