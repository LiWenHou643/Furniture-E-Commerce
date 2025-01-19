package com.example.application.mapper;

import com.example.application.dto.FeedbackDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface FeedbackImageMapper {

    FeedbackImageMapper INSTANCE = Mappers.getMapper(FeedbackImageMapper.class);

    FeedbackDTO toDTO(FeedbackDTO feedbackDTO);

    FeedbackDTO toEntity(FeedbackDTO feedbackDTO);
}
