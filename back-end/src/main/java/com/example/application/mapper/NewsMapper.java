package com.example.application.mapper;

import com.example.application.dto.NewsDTO;
import com.example.application.entity.News;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface NewsMapper {

    NewsMapper INSTANCE = Mappers.getMapper(NewsMapper.class);

    NewsDTO toDTO(News news);

    News toEntity(NewsDTO newsDTO);

}
