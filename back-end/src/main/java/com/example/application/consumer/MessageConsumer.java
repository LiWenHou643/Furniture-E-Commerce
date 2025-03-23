package com.example.application.consumer;

import java.text.MessageFormat;
import java.util.Optional;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.example.application.config.Kafka.KafkaGroups;
import com.example.application.config.Kafka.KafkaTopics;
import com.example.application.constants.NotificationChannel;
import com.example.application.dto.NotificationDTO;
import com.example.application.service.EmailService;
import com.example.application.service.NotificationService;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class MessageConsumer {

	EmailService emailService;
	NotificationService notificationService;

	@KafkaListener(topics = KafkaTopics.NOTIFICATION_DELIVERY, groupId = KafkaGroups.NOTIFICATION)
	public void handleNotification(NotificationDTO notificationDTO) {
		log.info("Message received: {}", notificationDTO);

		NotificationChannel channel = Optional.ofNullable(notificationDTO.getChannel())
				.orElseThrow(() -> new IllegalArgumentException("Notification channel cannot be null"));

		switch (channel) {
		case EMAIL:
			// Check the notification type and act accordingly
			switch (notificationDTO.getNotificationType()) {
			case WELCOME_EMAIL:
				emailService.sendWelcomeEmail(notificationDTO); // Assuming you have a method for sending a welcome
																// email
				break;

			case FORGOT_PASSWORD:
				emailService.sendPasswordResetEmail(notificationDTO); // Assuming you have a method for sending a
																		// password reset email
				break;

			default:
				throw new UnsupportedOperationException(MessageFormat.format("Unsupported email notification type: {0}",
						notificationDTO.getNotificationType()));
			}
			break;

		case IN_APP:
			notificationService.pushNotification(notificationDTO);
			break;

		default:
			throw new UnsupportedOperationException(
					MessageFormat.format("Unsupported notification channel: {0}", channel));
		}

	}
}
