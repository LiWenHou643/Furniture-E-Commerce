package com.example.application.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.application.dto.NotificationDTO;
import com.example.application.entity.Notification;

@Mapper(componentModel = "spring")
public interface NotificationMapper {

	@Mapping(target = "channel", ignore = true)
	@Mapping(target = "notificationType", ignore = true)
	@Mapping(target = "recipient", ignore = true)
	@Mapping(target = "subject", ignore = true)
	NotificationDTO toDTO(Notification notification);


	Notification toEntity(NotificationDTO notificationDTO);

}
