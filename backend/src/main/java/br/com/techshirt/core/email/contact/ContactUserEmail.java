package br.com.techshirt.core.email.contact;

import br.com.techshirt.exception.FailedSendEmailException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Service
public class ContactUserEmail {
    @Autowired
    private JavaMailSender javaMailSender;

    public void execute(String email, String name, String messageContact) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom("noreply@example.com");
            helper.setSubject("Confirmação de Contato - TechShirt");
            helper.setTo(email);

            String template = loadEmailTemplate();

            template = template.replace("#{nome}", name);
            template = template.replace("#{mensagem}", messageContact);
            helper.setText(template, true);

            javaMailSender.send(message);
        }catch (Exception e){
            e.printStackTrace();
            throw new FailedSendEmailException("Failed to send email");
        }
    }

    public String loadEmailTemplate() throws IOException {
        ClassPathResource resource = new ClassPathResource("templates/contact-user-email.html");
        return new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
    }
}
