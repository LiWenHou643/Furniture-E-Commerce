package com.example.application.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FeedbackDTO {
    Long feedbackId;
    Long orderDetailId;
    Long userId;
    Long productItemId;
    String userFirstName;
    String userLastName;
    String userImage;
    String comment;
    Integer rating;
    List<FeedbackImageDTO> images;
}
