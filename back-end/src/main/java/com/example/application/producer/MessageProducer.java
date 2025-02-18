package com.example.application.producer;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;

@Component
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MessageProducer {

	KafkaTemplate<String, Object> kafkaTemplate;

	public void sendMessage(String topic, Object messageObject) {
		kafkaTemplate.send(topic, messageObject);
	}
}