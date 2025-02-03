package com.example.application.mapper;

import com.example.application.dto.ChatMessageDTO;
import com.example.application.entity.ChatMessage;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ChatMessageMapper {

    ChatMessageMapper INSTANCE = Mappers.getMapper(ChatMessageMapper.class);

    ChatMessage toEntity(ChatMessageDTO chatMessage);

    ChatMessageDTO toDTO(ChatMessage chatMessage);

}
