package com.example.application.service;

import com.example.application.config.EmailConfig;
import com.example.application.dto.NotificationDTO;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Objects;

@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
@Service
public class EmailService {
    RedisTemplate<String, String> redisTemplate;
    JavaMailSender javaMailSender;
    EmailConfig emailConfig;

    public void sendVerificationEmail(NotificationDTO otpRequest) throws MessagingException {
        String subject = "Welcome to LuxeHouse";
        String companyName = "LuxeHouse";
        // Load the HTML template
        String htmlContent = null;
        try (var inputStream = Objects.requireNonNull(EmailService.class.getResourceAsStream(
                "/templates/email-content.html"))) {
            htmlContent = new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        htmlContent = htmlContent.replace("{{COMPANY_NAME}}", companyName);

        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom(emailConfig.getUsername());
            helper.setTo(otpRequest.getRecipient());
            helper.setSubject(subject);
            helper.setText(htmlContent, true); // true indicates HTML content
            helper.addInline("LOGO", new File("src/main/resources/static/logo.png"));
            javaMailSender.send(message);
        } catch (MailException e) {
            log.error("Error sending email: {}", e.getMessage());
            throw new MessagingException(e.getMessage());
        }
    }
}
