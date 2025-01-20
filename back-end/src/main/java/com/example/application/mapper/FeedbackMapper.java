package com.example.application.mapper;

import com.example.application.dto.FeedbackDTO;
import com.example.application.entity.Feedback;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface FeedbackMapper {
    FeedbackMapper INSTANCE = Mappers.getMapper(FeedbackMapper.class);

    @Mapping(target = "orderDetailId", source = "orderDetail.orderDetailId")
    @Mapping(target = "productId", source = "productItem.product.productId")
    @Mapping(target = "productItemId", source = "productItem.productItemId")
    @Mapping(target = "userId", source = "user.userId")
    @Mapping(target = "userFirstName", source = "user.firstName")
    @Mapping(target = "userLastName", source = "user.lastName")
    @Mapping(target = "userAvatar", source = "user.avatar")
    @Mapping(target = "images", source = "feedbackImages")
    FeedbackDTO toDTO(Feedback feedback);

    Feedback toEntity(FeedbackDTO feedbackDTO);
}
