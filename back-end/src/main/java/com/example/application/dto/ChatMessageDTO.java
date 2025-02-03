package com.example.application.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ChatMessageDTO {
    Long chatMessageId;
    String chatId;
    Long senderId;
    Long recipientId;
    String content;
    LocalDateTime timestamp;
}
