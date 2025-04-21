package com.example.application.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.application.dto.FeedbackDTO;
import com.example.application.entity.Feedback;

@Mapper(componentModel = "spring", uses = {FeedbackImageMapper.class})
public interface FeedbackMapper {

    @Mapping(target = "userId", source = "user.userId")
    @Mapping(target = "userFirstName", source = "user.firstName")
    @Mapping(target = "userLastName", source = "user.lastName")
    @Mapping(target = "userAvatar", source = "user.avatar")
    @Mapping(target = "images", source = "feedbackImages")
    @Mapping(target = "productItemId", source = "productItem.productItemId")
    @Mapping(target = "productId", source = "productItem.product.productId")
    @Mapping(target = "orderId", ignore = true)
    @Mapping(target = "orderDetailId", ignore = true)
    FeedbackDTO toDTO(Feedback feedback);

    
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "productItem", ignore = true)
    @Mapping(target = "feedbackImages", ignore = true)
    Feedback toEntity(FeedbackDTO feedbackDTO);

}
