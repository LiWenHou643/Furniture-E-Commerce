package com.example.application;

import com.example.application.config.RSAKeyRecord;
import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.time.LocalDateTime;
import java.util.TimeZone;

@SpringBootApplication(scanBasePackages = "com.example.application")
@EnableConfigurationProperties(RSAKeyRecord.class)
@EnableJpaAuditing(auditorAwareRef = "auditAwareImpl")
public class MainApplication {

    public static void main(String[] args) {
        SpringApplication.run(MainApplication.class, args);
    }

    @PostConstruct
    public void init() {
//        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
        System.out.println("JVM Time Zone: " + TimeZone.getDefault().getID());
        System.out.println("Current Time: " + LocalDateTime.now());
    }
}