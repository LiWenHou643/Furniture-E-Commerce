package com.example.application.service;

import com.example.application.dto.NotificationDTO;
import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeBodyPart;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMultipart;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Properties;

@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
@Service
public class EmailService {
    JavaMailSender mailSender;

    @Value("${spring.mail.host}")
    @NonFinal
    String host;

    @Value("${spring.mail.username}")
    @NonFinal
    String username;

    @Value("${spring.mail.password}")
    @NonFinal
    String password;

    @Value("${spring.mail.port}")
    @NonFinal
    String port;


    public void sendEmailAfterRegisterUser(NotificationDTO request) {
        // Email subject and HTML content with image
        String subject = request.getSubject();

        // Paths to HTML and image files
        String htmlFilePath = "src/main/resources/templates/email-content.html";
        String imageFilePath = "src/main/resources/static/logo.png";

        try {
            // Load HTML content from file
            String htmlContent = new String(Files.readAllBytes(Paths.get(htmlFilePath)));

            // Set up properties for the SMTP server
            Properties props = new Properties();
            props.put("mail.smtp.host", host);
            props.put("mail.smtp.port", port);
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.starttls.enable", "true");

            // Create a session with authentication
            Session session = Session.getInstance(props, new Authenticator() {
                @Override
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(username, password);
                }
            });

            // Create a MimeMessage
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(username));
            message.setRecipient(Message.RecipientType.TO, new InternetAddress(request.getRecipient()));
            message.setSubject(subject);

            // Create the multipart/related content
            MimeMultipart multipart = new MimeMultipart("related");

            // HTML part
            MimeBodyPart htmlPart = new MimeBodyPart();
            htmlPart.setContent(htmlContent, "text/html");
            multipart.addBodyPart(htmlPart);

            // Image part
            MimeBodyPart imagePart = new MimeBodyPart();
            imagePart.attachFile(imageFilePath); // Replace with your image path
            imagePart.setContentID("<LOGO>");
            imagePart.setDisposition(MimeBodyPart.INLINE); // Ensure it's inline
            multipart.addBodyPart(imagePart);

            // Set the content for the message
            message.setContent(multipart);

            // Send the email
            Transport.send(message);
            System.out.println("Email sent successfully with inline image!");

        } catch (Exception e) {
            log.error("Error sending email: ", e);
        }
    }
}
