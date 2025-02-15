package com.example.application.controller;

import com.example.application.dto.ApiResponse;
import com.example.application.dto.NotificationDTO;
import com.example.application.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/notifications")
public class NotificationController {

    NotificationService notificationService;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getAllNews(@PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<NotificationDTO> notiPage = notificationService.getNotifications(userId, page, size);
        return ResponseEntity.ok(
                ApiResponse.builder().status("success").message("Fetched notification successfully").data(notiPage)
                           .build());
    }

    @PutMapping("/{notificationId}")
    public ResponseEntity<?> markAsRead(@PathVariable Long notificationId) {
        notificationService.markAsRead(notificationId);
        return ResponseEntity.ok(
                ApiResponse.builder().status("success").message("Notification marked as read").build());
    }

    @PostMapping("")
    public ResponseEntity<?> saveNotification(@RequestBody NotificationDTO notificationDTO) {
        notificationService.saveNotification(notificationDTO);
        return ResponseEntity.ok(
                ApiResponse.builder().status("success").message("Notification saved successfully").build());
    }

}
