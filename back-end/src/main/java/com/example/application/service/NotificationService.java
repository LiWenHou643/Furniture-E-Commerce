package com.example.application.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.example.application.dto.NotificationDTO;
import com.example.application.entity.Notification;
import com.example.application.mapper.NotificationMapper;
import com.example.application.repository.NotificationRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class NotificationService {

    NotificationRepository notificationRepository;
    NotificationMapper notificationMapper;
    SimpMessagingTemplate messagingTemplate;

    public void markAsRead(List<Long> notificationIds) {
        List<Notification> notifications = notificationRepository.findAllById(notificationIds);
        notifications.forEach(notification -> notification.setReadStatus(true));
        notificationRepository.saveAll(notifications);
    }

    public Page<NotificationDTO> getNotifications(Long userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return notificationRepository.findByUserId(userId, pageable).map(
        		notificationMapper::toDTO
        );
    }

    public void pushNotification(NotificationDTO notificationDTO) {
        saveNotification(notificationDTO);

        // Push notification logic
        messagingTemplate.convertAndSendToUser(String.valueOf(notificationDTO.getUserId()), "/queue/notifications",
                notificationDTO);

    }

    public void saveNotification(NotificationDTO notificationDTO) {
        Notification notification = notificationMapper.toEntity(notificationDTO);
        notificationRepository.save(notification);
    }

}
