package com.example.application.controller;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import org.springframework.util.*;

@RestController
@RequestMapping("/api/image-search")
public class ImageSearchController {

    private static final String FLASK_API_URL = "http://localhost:5000/predict"; // Flask server URL

    @PostMapping("/predict")
    public ResponseEntity<String> predictFlower(@RequestParam("image") MultipartFile file) {
        try {
            // Create a RestTemplate instance to send the image to Flask API
            RestTemplate restTemplate = new RestTemplate();

            // Convert MultipartFile to ByteArrayResource
            ByteArrayResource resource = new ByteArrayResource(file.getBytes()) {
                @Override
                public String getFilename() {
                    return file.getOriginalFilename();
                }
            };

            // Create a MultipartBodyBuilder to build the request
            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("image", resource);

            // Set headers for the request
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            // Create the HttpEntity with body and headers
            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            // Send POST request to Flask API and get the response

            // Return the response from Flask API
            return restTemplate.exchange(FLASK_API_URL, HttpMethod.POST, requestEntity,
                    String.class);

        } catch (Exception e) {
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
