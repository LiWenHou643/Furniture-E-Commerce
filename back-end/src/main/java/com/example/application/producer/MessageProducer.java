package com.example.application.producer;

import com.example.application.dto.NotificationDTO;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MessageProducer {

    KafkaTemplate<String, Object> kafkaTemplate;

    public void sendMessage(String topic, NotificationDTO notificationDTO) {
        kafkaTemplate.send(topic, notificationDTO);
    }
}