package com.example.application.controller;

import com.example.application.dto.ApiResponse;
import com.example.application.dto.NewsDTO;
import com.example.application.service.NewsService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class NewsController {

    NewsService newsService;

    @GetMapping("/news")
    public ResponseEntity<?> getAllNews() {
        List<NewsDTO> news = newsService.getAllNews();
        return ResponseEntity.ok(
                ApiResponse.builder().status("success").message("Fetched news successfully").data(news).build());
    }

    @GetMapping("/news/{id}")
    public ResponseEntity<?> getNewsById(@PathVariable Long id) {
        NewsDTO news = newsService.getNewsById(id);
        return ResponseEntity.ok(
                ApiResponse.builder().status("success").message("Fetched news successfully").data(news).build());
    }
}
