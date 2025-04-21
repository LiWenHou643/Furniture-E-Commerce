package com.example.application.controller;

import com.example.application.dto.ApiResponse;
import com.example.application.dto.ChatMessageDTO;
import com.example.application.dto.ChatRoomDTO;
import com.example.application.entity.ChatMessage;
import com.example.application.entity.ChatNotification;
import com.example.application.mapper.ChatMessageMapper;
import com.example.application.service.ChatMessageService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class ChatController {

    SimpMessagingTemplate messagingTemplate;
    ChatMessageService chatMessageService;
    ChatMessageMapper chatMessageMapper;

    // For regular public messages (if you still want that)
    @MessageMapping("/broadcast")
    @SendTo("/topic/messages")
    public ChatMessageDTO sendMessage(ChatMessage message) {
        return chatMessageMapper.toDTO(message); // Broadcast to all users
    }

    // This will handle private messages.
    @MessageMapping("/send")
    public void sendPrivateMessage(@Payload ChatMessageDTO message) {
        var recipientId = message.getRecipientId(); // e.g., "1"
        var savedMsg = chatMessageService.save(message);

        // Send the message to the specific user (private message)
        messagingTemplate.convertAndSendToUser(String.valueOf(recipientId), "/queue/messages",
                new ChatNotification(savedMsg.getChatMessageId(), savedMsg.getSenderId(),
                        savedMsg.getRecipientId(), savedMsg.getContent(), savedMsg.getTimestamp()));
    }

    @GetMapping("/messages/{senderId}/{recipientId}")
    public ResponseEntity<?> findChatMessages(
            @PathVariable Long senderId,
            @PathVariable Long recipientId,
            @RequestParam(required = false) LocalDateTime lastTimestamp, // Cursor-based pagination
            @RequestParam(defaultValue = "10") int size
    ) {
        var data = chatMessageService.findChatMessages(senderId, recipientId, lastTimestamp, size);
        return ResponseEntity.ok(ApiResponse.<List<ChatMessageDTO>>builder()
                                            .status("success")
                                            .message("Chat messages fetched successfully")
                                            .data(data).build());
    }

    @GetMapping("/admin/messages")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> findAllChatMessages(
            @RequestParam(required = false) Long userId, // Optional: filter by specific user if needed
            @RequestParam(required = false) LocalDateTime lastTimestamp, // Cursor-based pagination
            @RequestParam(defaultValue = "10") int size
    ) {
        if (userId != null) {
            var data = chatMessageService.findChatMessages(1L, userId , lastTimestamp, size);
            return ResponseEntity.ok(ApiResponse.<List<ChatMessageDTO>>builder()
                                                .status("success")
                                                .message("Chat messages fetched successfully")
                                                .data(data).build());
        }

        var chatRoomDTOS = chatMessageService.getAllChatRoomsWithMessages(size);

        return ResponseEntity.ok(ApiResponse.<List<ChatRoomDTO>>builder()
                                            .status("success")
                                            .message("All chat messages fetched successfully")
                                            .data(chatRoomDTOS).build());
    }


}
