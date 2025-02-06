package com.example.application.service;

import com.example.application.dto.ChatMessageDTO;
import com.example.application.entity.ChatMessage;
import com.example.application.mapper.ChatMessageMapper;
import com.example.application.repository.ChatMessageRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class ChatMessageService {
    ChatMessageRepository chatMessageRepository;
    ChatRoomService chatRoomService;

    public ChatMessageDTO save(ChatMessageDTO chatMessageDTO) {
        var chatEntity = ChatMessageMapper.INSTANCE.toEntity(chatMessageDTO);
        chatEntity.setChatMessageId(null);
        var chatId = chatRoomService
                .getChatRoomId(chatMessageDTO.getSenderId(), chatMessageDTO.getRecipientId(), true)
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

        return chatMessagesPage.stream()
                               .map(ChatMessageMapper.INSTANCE::toDTO)
                               .sorted(Comparator.comparing(
                                       ChatMessageDTO::getTimestamp)) // Ascending order for UI display
                               .collect(Collectors.toList());
    }


}