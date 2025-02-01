package com.example.application.controller;

import com.example.application.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
@RequestMapping("/test")
public class test {

    @GetMapping("/testing")
    public ResponseEntity<ApiResponse<?>> testing() {

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .status("success")
                        .message("Test endpoint")
                        .build()
        );
    }
}
