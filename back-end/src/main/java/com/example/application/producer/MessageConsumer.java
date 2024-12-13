package com.example.application.producer;

import com.example.application.dto.NotificationDTO;
import com.example.application.service.EmailService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class MessageConsumer {
    EmailService emailService;

    @KafkaListener(topics = "notification-delivery")
    public void listen(NotificationDTO notificationDTO) throws MessagingException {
        log.info("Message received is: {}", notificationDTO);
        emailService.sendVerificationEmail(notificationDTO);
    }

}