package com.example.application.config.Kafka;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class KafkaTopicConfig {

	@Bean
	NewTopic notificationTopic() {
		// Define topic "notification-delivery" with 3 partitions and replication factor
		// 1
		return new NewTopic("notification-delivery", 3, (short) 1);
	}
}
