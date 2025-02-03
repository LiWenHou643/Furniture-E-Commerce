package com.example.application.controller;

import com.example.application.dto.ChatMessageDTO;
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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class ChatController {

    SimpMessagingTemplate messagingTemplate;
    ChatMessageService chatMessageService;

    // For regular public messages (if you still want that)
    @MessageMapping("/broadcast")
    @SendTo("/topic/messages")
    public ChatMessageDTO sendMessage(ChatMessage message) {
        return ChatMessageMapper.INSTANCE.toDTO(message); // Broadcast to all users
    }

    @GetMapping("/messages/{senderId}/{recipientId}")
    public ResponseEntity<List<ChatMessageDTO>> findChatMessages(@PathVariable Long senderId, @PathVariable Long recipientId) {
        var userId = getUserId();
        if (!userId.equals(senderId)) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(chatMessageService.findChatMessages(senderId, recipientId));
    }


    // This will handle private messages.
    @MessageMapping("/send")
    public void sendPrivateMessage(@Payload ChatMessageDTO message) {
        var recipientId = message.getRecipientId(); // e.g., "1"
        var savedMsg = chatMessageService.save(message);

        // Send the message to the specific user (private message)
        messagingTemplate.convertAndSendToUser(String.valueOf(recipientId), "/queue/messages",
                new ChatNotification(savedMsg.getChatMessageId(), savedMsg.getSenderId(),
                        savedMsg.getRecipientId(), savedMsg.getContent()));
    }

    private Long getUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (Long) (authentication).getDetails();
    }
}
