package com.example.application.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FeedbackDTO {
	Long feedbackId;
	Long userId;
	Long productId;
	Long productItemId;
	Long orderId;
	Long orderDetailId;
	String userFirstName;
	String userLastName;
	String userAvatar;
	String comment;
	Integer rating;
	List<FeedbackImageDTO> images;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
	LocalDateTime createdAt;

	@Override
	public String toString() {
		return "FeedbackDTO [feedbackId=" + feedbackId + ", userId=" + userId + ", productId=" + productId
				+ ", productItemId=" + productItemId + ", orderDetailId=" + orderDetailId + ", userFirstName="
				+ userFirstName + ", userLastName=" + userLastName + ", userAvatar=" + userAvatar + ", comment="
				+ comment + ", rating=" + rating + ", images=" + images + ", createdAt=" + createdAt + "]";
	}
}
