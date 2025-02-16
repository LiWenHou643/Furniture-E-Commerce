package com.example.application.dto;

import com.example.application.constants.NotificationChannel;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

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
