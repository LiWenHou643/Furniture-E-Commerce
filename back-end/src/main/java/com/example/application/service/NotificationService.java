package com.example.application.service;

import com.example.application.dto.NotificationDTO;
import com.example.application.entity.Notification;
import com.example.application.mapper.NotificationMapper;
import com.example.application.repository.NotificationRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class NotificationService {

    NotificationRepository notificationRepository;

    public void markAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                                                          .orElseThrow(() -> new RuntimeException("Notification not found"));
        notification.setReadStatus(true);
        notificationRepository.save(notification);
    }

    public Page<NotificationDTO> getNotifications(Long userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return notificationRepository.findByUserIdAndReadStatusFalse(userId, pageable).map(
                NotificationMapper.INSTANCE::toDTO
        );
    }

    public void saveNotification(NotificationDTO notificationDTO) {
        Notification notification = NotificationMapper.INSTANCE.toEntity(notificationDTO);
        notificationRepository.save(notification);
    }

}
