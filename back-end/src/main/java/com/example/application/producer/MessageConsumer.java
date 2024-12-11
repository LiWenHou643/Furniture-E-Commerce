package com.example.application.producer;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class MessageConsumer {

    @KafkaListener(topics = "levanhau", groupId = "levanhau")
    public void listen(String message) {
        System.out.println("Received message: " + message);
    }
}