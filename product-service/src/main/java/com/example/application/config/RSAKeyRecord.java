package com.example.application.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.security.interfaces.RSAPublicKey;

@ConfigurationProperties(prefix = "jwt")
public record RSAKeyRecord(RSAPublicKey rsaPublicKey) {

}