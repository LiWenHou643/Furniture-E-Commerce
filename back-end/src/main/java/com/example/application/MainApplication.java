package com.example.application;

import com.example.application.config.RSAKeyRecord;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.stereotype.Component;

@SpringBootApplication(scanBasePackages = "com.example.application")
@EnableConfigurationProperties(RSAKeyRecord.class)
@EnableJpaAuditing(auditorAwareRef = "auditAwareImpl")
public class MainApplication {

    public static void main(String[] args) {
        SpringApplication.run(MainApplication.class, args);
    }

}