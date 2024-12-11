package com.example.application.config;

import com.twilio.Twilio;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties("twilio")
public class TwilioConfig {
    private String accountSid;
    private String authToken;
    private String trialNumber;

    @PostConstruct
    public void init() {
        Twilio.init(accountSid, authToken);
    }
}
