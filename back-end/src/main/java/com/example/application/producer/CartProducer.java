package com.example.application.producer;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import com.example.application.config.Kafka.KafkaTopics;
import com.example.application.dto.NotificationDTO;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;

@Component
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CartProducer {

	KafkaTemplate<String, Object> kafkaTemplate;

	public void sendMessage(NotificationDTO notificationDTO) {
		kafkaTemplate.send(KafkaTopics.CART, notificationDTO);
	}
}