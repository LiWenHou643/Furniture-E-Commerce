package com.example.application.mapper;

import org.mapstruct.Mapper;

import com.example.application.dto.ChatMessageDTO;
import com.example.application.entity.ChatMessage;

@Mapper(componentModel = "spring")
public interface ChatMessageMapper {

    ChatMessage toEntity(ChatMessageDTO chatMessage);

    ChatMessageDTO toDTO(ChatMessage chatMessage);

}
