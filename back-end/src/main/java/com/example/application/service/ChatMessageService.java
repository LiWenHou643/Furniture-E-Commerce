package com.example.application.service;

import com.example.application.dto.ChatMessageDTO;
import com.example.application.mapper.ChatMessageMapper;
import com.example.application.repository.ChatMessageRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
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
        var chatId = chatRoomService
                .getChatRoomId(chatMessageDTO.getSenderId(), chatMessageDTO.getRecipientId(), true)
                .orElseThrow(); // You can create your own dedicated exception
        chatEntity.setChatId(chatId);
        chatEntity.setTimestamp(LocalDateTime.now());
        var saved = chatMessageRepository.save(chatEntity);
        return ChatMessageMapper.INSTANCE.toDTO(saved);
    }

    public List<ChatMessageDTO> findChatMessages(Long senderId, Long recipientId) {
        var chatId = chatRoomService.getChatRoomId(senderId, recipientId, false).orElse(null);
        var chatList = new ArrayList<>(chatMessageRepository.findByChatId(chatId));
        return chatList.stream().map(ChatMessageMapper.INSTANCE::toDTO).collect(Collectors.toList());
    }
}