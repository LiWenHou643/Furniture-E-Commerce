package com.example.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.example.application.config.RSAKeyRecord;

@SpringBootApplication(scanBasePackages = "com.example.application")
@EnableConfigurationProperties(RSAKeyRecord.class)
//@EnableJpaAuditing(auditorAwareRef = "auditAwareImpl")
public class MainApplication {
	public static void main(String[] args) {
		SpringApplication.run(MainApplication.class, args);
	}
}