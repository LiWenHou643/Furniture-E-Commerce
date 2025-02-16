package com.example.application.controller;

import com.example.application.dto.ApiResponse;
import com.example.application.dto.NotificationDTO;
import com.example.application.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/notifications")
public class NotificationController {

    NotificationService notificationService;

    @GetMapping("")
    public ResponseEntity<?> getAllNews(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Long userId = getUserId();
        Page<NotificationDTO> notiPage = notificationService.getNotifications(userId, page, size);
        return ResponseEntity.ok(
                ApiResponse.builder().status("success").message("Fetched notification successfully").data(notiPage)
                           .build());
    }

    @PutMapping("")
    public ResponseEntity<?> markAsRead(@RequestBody List<Long> notificationIds) {
        notificationService.markAsRead(notificationIds);
        return ResponseEntity.ok(
                ApiResponse.builder().status("success").message("Notification marked as read").build());
    }

    private Long getUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (Long) (authentication).getDetails();
    }
}
