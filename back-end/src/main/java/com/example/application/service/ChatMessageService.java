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

    public List<ChatMessageDTO> findChatMessages(Long senderId, Long recipientId, int page, int size) {
        var chatId = chatRoomService.getChatRoomId(senderId, recipientId, false).orElse(null);

        // Create Pageable object to specify the page and size
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc("timestamp"))); // Sort by timestamp descending

        // Fetch paginated messages
        Page<ChatMessage> chatMessagesPage = chatMessageRepository.findByChatId(chatId, pageable);

        // Map the list of ChatMessages to DTOs
        return chatMessagesPage.stream().map(ChatMessageMapper.INSTANCE::toDTO).collect(Collectors.toList());
    }

}