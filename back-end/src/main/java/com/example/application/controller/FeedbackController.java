package com.example.application.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.application.dto.ApiResponse;
import com.example.application.dto.FeedbackDTO;
import com.example.application.service.FeedbackService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class FeedbackController {

	FeedbackService feedbackService;

	@GetMapping("/feedbacks")
	public ResponseEntity<ApiResponse<?>> getFeedbacksByProductId(@RequestParam Long productId) {
		return ResponseEntity
				.ok(ApiResponse.builder().status("success").data(feedbackService.getFeedbacksByProductId(productId))
						.message("Feedbacks retrieved successfully").build());
	}

	@PostMapping(value = "/feedbacks", consumes = "multipart/form-data")
	public ResponseEntity<ApiResponse<?>> saveFeedback(@RequestPart(value = "feedback") String feedbackJson,
			@RequestPart(value = "files", required = false) MultipartFile[] files)
			throws JsonMappingException, JsonProcessingException {

		// Use ObjectMapper to convert the JSON string into a FeedbackDTO object
		ObjectMapper objectMapper = new ObjectMapper();
		FeedbackDTO feedbackDTO = objectMapper.readValue(feedbackJson, FeedbackDTO.class);

		var userId = getUserId();

		// Log feedbackDTO and images to ensure they are received correctly
		System.out.println("FeedbackDTO: " + feedbackDTO);
		if (files != null) {
			System.out.println("Received " + files.length + " images.");
		}

		return ResponseEntity.ok(
				ApiResponse.builder().status("success").data(feedbackService.saveFeedback(userId, feedbackDTO, files))
						.message("Feedback saved successfully").build());
	}

	private Long getUserId() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		return (Long) (authentication).getDetails();
	}
}
