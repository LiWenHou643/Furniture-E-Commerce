package com.example.application.entity;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ChatNotification {
    Long id;
    Long senderId;
    Long recipientId;
    String content;
}
