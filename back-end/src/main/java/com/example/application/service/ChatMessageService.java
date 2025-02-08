package com.example.application.service;

import com.example.application.dto.ChatMessageDTO;
import com.example.application.dto.ChatRoomDTO;
import com.example.application.entity.ChatMessage;
import com.example.application.mapper.ChatMessageMapper;
import com.example.application.repository.ChatMessageRepository;
import com.example.application.repository.ChatRoomRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class ChatMessageService {
    ChatMessageRepository chatMessageRepository;
    ChatRoomService chatRoomService;
    ChatRoomRepository chatRoomRepository;

    public ChatMessageDTO save(ChatMessageDTO chatMessageDTO) {
        LocalDateTime utcTime = chatMessageDTO.getTimestamp(); // Received UTC time
        ZonedDateTime vietnamTime = utcTime.atZone(ZoneId.of("UTC"))
                                           .withZoneSameInstant(ZoneId.of("Asia/Ho_Chi_Minh"));

        // Convert back to LocalDateTime for saving
        LocalDateTime localVietnamTime = vietnamTime.toLocalDateTime();

        // Map DTO to Entity
        var chatEntity = ChatMessageMapper.INSTANCE.toEntity(chatMessageDTO);
        chatEntity.setChatMessageId(null);
        chatEntity.setTimestamp(localVietnamTime);
        var chatId = chatRoomService.getChatRoomId(chatMessageDTO.getSenderId(), chatMessageDTO.getRecipientId(), true)
                                    .orElseThrow(); // You can create your own dedicated exception
        chatEntity.setChatId(chatId);
        var saved = chatMessageRepository.save(chatEntity);
        return ChatMessageMapper.INSTANCE.toDTO(saved);
    }

    public List<ChatMessageDTO> findChatMessages(Long senderId, Long recipientId, LocalDateTime lastTimestamp, int size) {
        var chatId = chatRoomService.getChatRoomId(senderId, recipientId, false).orElse(null);

        Pageable pageable = PageRequest.of(0, size, Sort.by("timestamp").descending());

        Page<ChatMessage> chatMessagesPage;

        if (lastTimestamp == null) {
            // Fetch the latest messages
            chatMessagesPage = chatMessageRepository.findByChatId(chatId, pageable);
        } else {
            // Fetch older messages before `lastTimestamp`
            chatMessagesPage = chatMessageRepository.findByChatIdAndTimestampBefore(chatId, lastTimestamp, pageable);
        }

        return chatMessagesPage.stream().map(ChatMessageMapper.INSTANCE::toDTO).sorted(Comparator.comparing(
                                       ChatMessageDTO::getTimestamp)) // Ascending order for UI display
                               .collect(Collectors.toList());
    }

    public List<ChatRoomDTO> getAllChatRoomsWithMessages(int size) {
        // Fetch unique chat IDs
        var chatIds = chatRoomRepository.findDistinctChatIds();

        // Fetch latest messages for each chat room
        return chatIds.stream().map(chatId -> {
            var pageable = PageRequest.of(0, size, Sort.by("timestamp").descending());
            var chatMessages = chatMessageRepository.findByChatId(chatId, pageable)
                                                    .stream().map(ChatMessageMapper.INSTANCE::toDTO)
                                                    .toList();

            // Handle case where there are no messages for the chat room
            if (chatMessages.isEmpty()) {
                return ChatRoomDTO.builder()
                                  .chatId(chatId)
                                  .userId(null) // No sender available
                                  .lastMessage(ChatMessageDTO.builder().build()) // Empty messages list
                                  .build();
            }

            var userId = chatMessages.getFirst().getSenderId(); // Safe

            if (chatMessages.getFirst().getSenderId() == 1) {
                userId = chatMessages.getFirst().getRecipientId(); // Safe
            }

            // Use the first message safely
            return ChatRoomDTO.builder()
                              .chatId(chatId)
                              .userId(userId) // Safe
                              .lastMessage(chatMessages.getFirst())
                              .build();
        }).collect(Collectors.toList());
    }


}