package com.example.application.mapper;

import org.mapstruct.Mapper;

import com.example.application.dto.NewsDTO;
import com.example.application.entity.News;

@Mapper(componentModel = "spring")
public interface NewsMapper {

    NewsDTO toDTO(News news);

    News toEntity(NewsDTO newsDTO);

}
