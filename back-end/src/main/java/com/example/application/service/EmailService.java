package com.example.application.service;

import com.example.application.dto.NotificationDTO;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Objects;

@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
@Service
public class EmailService {
    JavaMailSender javaMailSender;

    @Value("${spring.mail.company}")
    @NonFinal
    String companyName;

    @Value("${spring.mail.username}")
    @NonFinal
    String email;

    public void sendEmailAfterRegisterUser(NotificationDTO request) throws MessagingException, IOException {
        String subject = request.getSubject();

        // Load the HTML template
        String htmlContent = null;
        try (var inputStream = Objects.requireNonNull(EmailService.class.getResourceAsStream(
                "/templates/email-content.html"))) {
            htmlContent = new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        htmlContent = htmlContent.replace("{{COMPANY_NAME}}", companyName);

        ClassPathResource logoResource = new ClassPathResource("static/logo.png");

        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom(email);
            helper.setTo(request.getRecipient());
            helper.setSubject(subject);
            helper.setText(htmlContent, true); // true indicates HTML content
            helper.addInline("LOGO", logoResource.getFile());
            javaMailSender.send(message);
        } catch (MailException e) {
            log.error("Error sending email: {}", e.getMessage());
            throw new MessagingException(e.getMessage());
        } catch (IOException e) {
            throw new IOException(e);
        }
    }
}
