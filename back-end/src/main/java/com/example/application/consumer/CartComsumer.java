package com.example.application.consumer;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.example.application.config.Kafka.KafkaTopics;
import com.example.application.dto.CartDTO;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class CartComsumer {

	@KafkaListener(topics = KafkaTopics.CART)
	public void listen(CartDTO cartDTO) {
		log.info("Message received is: {}", cartDTO);
	}
}
