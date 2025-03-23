package com.example.application.dto;

import java.time.LocalDateTime;

import com.example.application.constants.NotificationChannel;
import com.example.application.constants.NotificationType;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class NotificationDTO {
	NotificationChannel channel;
	NotificationType notificationType;
	String recipient;
	String subject;

	Long notificationId;
	Long userId;
	String title;
	String message;
	Boolean readStatus;
	String actionUrl;
	LocalDateTime createdAt;
}
