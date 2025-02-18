package com.example.application.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.example.application.dto.NotificationDTO;
import com.example.application.entity.Notification;

@Mapper(componentModel = "spring")
public interface NotificationMapper {

	NotificationMapper INSTANCE = Mappers.getMapper(NotificationMapper.class);

	NotificationDTO toDTO(Notification notification);

	Notification toEntity(NotificationDTO notificationDTO);

}
