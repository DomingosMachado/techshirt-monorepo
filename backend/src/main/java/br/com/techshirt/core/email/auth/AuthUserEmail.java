package br.com.techshirt.core.email.auth;

import br.com.techshirt.exception.FailedSendEmailException;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class AuthUserEmail {
    @Autowired
    private JavaMailSender javaMailSender;

    public void execute(String email, String name, HttpServletRequest request) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom("noreply@example.com");
            helper.setSubject("Aviso de Login - Tech Shirt");
            helper.setTo(email);

            String template = loadEmailTemplate();

            LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
            String dateTime = now.format(formatter);

            String userAgent = request.getHeader("User-Agent");

            template = template.replace("#{nome}", name);
            template = template.replace("#{dataHora}", dateTime);
            template = template.replace("#{dispositivo}", userAgent);

            helper.setText(template, true);

            javaMailSender.send(message);
        }catch (Exception e){
            e.printStackTrace();
            throw new FailedSendEmailException("Failed to send email");
        }
    }

    public String loadEmailTemplate() throws IOException {
        ClassPathResource resource = new ClassPathResource("templates/auth-user-email.html");
        return new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
    }
}
