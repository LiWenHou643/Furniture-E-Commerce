package com.example.application.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.example.application.dto.NewsDTO;
import com.example.application.mapper.NewsMapper;
import com.example.application.repository.NewsRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class NewsService {

    NewsRepository newsRepository;
    NewsMapper newsMapper;

    @Cacheable(value = "news")
    public List<NewsDTO> getAllNews() {
        return newsRepository.findAllByOrderByCreatedAtDesc().stream().map(newsMapper::toDTO)
                             .collect(Collectors.toList());
    }

    @Cacheable(value = "news", key = "#id")
    public NewsDTO getNewsById(Long id) {
        return newsMapper.toDTO(newsRepository.findById(id).orElse(null));
    }
}
