package br.com.techshirt.core.email.twoFA;

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
public class TwoFADisableEmail {
    @Autowired
    private JavaMailSender javaMailSender;

    public void execute(String email, String name, HttpServletRequest request) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom("noreply@example.com");
            helper.setSubject("Autenticação de 2 Fatores Desativada - TechShirt");
            helper.setTo(email);

            String template = loadEmailTemplate();

            LocalDateTime now = LocalDateTime.now();
            String dateTime = now.format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss"));
            String userAgent = request.getHeader("User-Agent");

            template = template.replace("#{nome}", name);
            template = template.replace("#{dataHora}", dateTime);
            template = template.replace("#{dispositivo}", userAgent);

            helper.setText(template, true);

            javaMailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
            throw new FailedSendEmailException("Failed to send 2FA activation email");
        }
    }

    public String loadEmailTemplate() throws IOException {
        ClassPathResource resource = new ClassPathResource("templates/twofa-disable-email.html");
        return new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
    }
}
