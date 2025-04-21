package com.example.application.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.application.dto.FeedbackImageDTO;
import com.example.application.entity.FeedbackImage;

@Mapper(componentModel = "spring")
public interface FeedbackImageMapper {

    @Mapping(target = "feedbackId", source = "feedback.feedbackId")
    FeedbackImageDTO toDTO(FeedbackImage feedbackImage);

    @Mapping(target = "feedback", ignore = true)
    FeedbackImage toEntity(FeedbackImageDTO feedbackImageDTO);
}
