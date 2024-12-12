package com.example.application.service;

import com.example.application.config.EmailConfig;
import com.example.application.dto.NotificationEvent;
import com.example.application.dto.OtpRequest;
import com.example.application.producer.MessageProducer;
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
import java.util.Random;
import java.util.concurrent.TimeUnit;

@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
@Service
public class EmailService {
    RedisTemplate<String, String> redisTemplate;
    MessageProducer messageProducer;
    JavaMailSender javaMailSender;
    EmailConfig emailConfig;

    public void sendToKafka(OtpRequest otpRequest){
        NotificationEvent notificationEvent = NotificationEvent.builder().channel(
                "EMAIL"
        ).recipient(otpRequest.getEmail())
                .subject("Welcome to my channel")
                .body("Hello, " + otpRequest.getUsername()).build();

        messageProducer.sendMessage("notification-delivery", notificationEvent);
    }

    public void sendVerificationEmail(NotificationEvent otpRequest) throws MessagingException {
        String subject = "Account Verification";
        String otpCode = generateOtp(otpRequest.getRecipient());
        String verificationLink = "http://localhost:8080/api/otp/verify?email=" + otpRequest.getRecipient() + "&otp=" + otpCode;
        String companyName = "LuxeHouse";
        // Load the HTML template
        String htmlContent = null;
        try (var inputStream = Objects.requireNonNull(EmailService.class.getResourceAsStream("/templates/email-otp-content.html"))) {
            htmlContent = new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        htmlContent = htmlContent.replace("{{OTP_CODE}}", otpCode);
        htmlContent = htmlContent.replace("{{VERIFICATION_LINK}}", verificationLink);
        htmlContent = htmlContent.replace("{{COMPANY_NAME}}", companyName);

        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom(emailConfig.getUsername());
            helper.setTo(otpRequest.getRecipient());
            helper.setSubject(subject);
            helper.setText(htmlContent, true); // true indicates HTML content
            helper.addInline("LOGO", new File("/home/levanhau/Desktop/logo.jpg"));
            javaMailSender.send(message);
        } catch (MailException e) {
            log.error("Error sending email: {}", e.getMessage());
        }
    }

    // Generate OTP
    public String generateOtp(String email) {
        String otp = String.valueOf(new Random().nextInt(900000) + 100000); // Generate a 6-digit OTP
        // Store OTP in Redis with a 5-minute expiration
        redisTemplate.opsForValue().set(email, otp, 5, TimeUnit.MINUTES);
        return otp;
    }

    // Verify OTP
    public boolean verifyOtp(String email, String otp) {
        String storedOtp = redisTemplate.opsForValue().get(email);
        if (otp.equals(storedOtp)) {
            deleteOtp(email);
        }
        return otp.equals(storedOtp);
    }

    // Delete OTP after successful verification
    public void deleteOtp(String email) {
        redisTemplate.delete(email);
    }
}
