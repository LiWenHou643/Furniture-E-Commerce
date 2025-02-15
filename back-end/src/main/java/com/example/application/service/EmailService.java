package com.example.application.service;

import com.example.application.dto.NotificationDTO;
import jakarta.activation.DataHandler;
import jakarta.activation.DataSource;
import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeBodyPart;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMultipart;
import jakarta.mail.util.ByteArrayDataSource;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Properties;
import java.util.UUID;

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

            // Generate a CID for the image
            String cid = generateCID();

            // HTML part
            MimeBodyPart htmlPart = new MimeBodyPart();
            htmlContent = htmlContent.replace("cid:LOGO", "cid:" + cid);
            htmlPart.setContent(htmlContent, "text/html");

            // Image part
            MimeBodyPart imagePart = new MimeBodyPart();
            String imagePath = "static/logo.png";  // Path relative to src/main/resources
            InputStream imageStream = EmailService.class.getClassLoader().getResourceAsStream(imagePath);
            if (imageStream == null) {
                throw new Exception("Image not found: " + imagePath);
            }
            DataSource dataSource = new ByteArrayDataSource(imageStream, "image/png");
            imagePart.setDataHandler(new DataHandler(dataSource));
            imagePart.setHeader("Content-ID", "<" + cid + ">");
            imagePart.setDisposition(MimeBodyPart.INLINE);
            imagePart.setFileName("logo.png");

            // Set the content for the message
            MimeMultipart multipart = new MimeMultipart("related");
            multipart.addBodyPart(htmlPart);
            multipart.addBodyPart(imagePart);
            message.setContent(multipart);

            // Send the email
            Transport.send(message);
            System.out.println("Email sent successfully with inline image!");

        } catch (Exception e) {
            log.error("Error sending email: ", e);
        }
    }

    private String generateCID() {
        return UUID.randomUUID().toString();
    }
}
