package com.example.application.service;

import com.example.application.dto.NewsDTO;
import com.example.application.mapper.NewsMapper;
import com.example.application.repository.NewsRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class NewsService {

    NewsRepository newsRepository;

    public List<NewsDTO> getAllNews() {
        return newsRepository.findAll().stream().map(NewsMapper.INSTANCE::toDTO).collect(Collectors.toList());
    }
}
