package br.com.techshirt.core.email.orders;

import br.com.techshirt.exception.FailedSendEmailException;
import br.com.techshirt.modules.house.HouseEntity;
import br.com.techshirt.modules.orders.OrderItemEntity;
import br.com.techshirt.modules.orders.OrdersEntity;
import br.com.techshirt.modules.orders.enums.OrderStatus;
import br.com.techshirt.modules.product.ProductEntity;
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
public class OrdersUpdateEmail {
    @Autowired
    private JavaMailSender javaMailSender;

    public void execute(String email, String name, OrdersEntity order, HouseEntity house) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom("noreply@example.com");
            helper.setSubject("Atualização de Pedido - TechShirt");
            helper.setTo(email);

            String template = loadEmailTemplate();

            LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
            String dateTime = now.format(formatter);

            StringBuilder productsHtml = new StringBuilder();
            for (OrderItemEntity item : order.getItems()) {
                ProductEntity product = item.getProduct();
                String qrCodeUrl = product.getQrCode().getQrcodeUrl();

                productsHtml.append("<table width='100%' cellpadding='0' cellspacing='0' border='0' style='border-bottom: 1px solid #ddd; padding: 10px 0;'>")
                        .append("<tr>")
                        .append("<td width='70%' valign='top' style='padding-right: 20px;'>")
                        .append("<strong>").append(product.getName()).append("</strong><br>")
                        .append("Quantidade: ").append(item.getQuantity()).append("<br>")
                        .append("Preço unitário: R$ ").append(String.format("%.2f", item.getPricePerUnit())).append("<br>")
                        .append("Cor: ").append(product.getColor())
                        .append(", Tamanho: ").append(item.getProductSize())
                        .append(", Material: ").append(product.getMaterial())
                        .append("</td>")
                        .append("<td width='30%' valign='top' align='right'>");
                if (qrCodeUrl != null && !qrCodeUrl.isEmpty()) {
                    productsHtml.append("<img src='").append(qrCodeUrl).append("' alt='QR Code do Produto' width='100' height='100' style='border:1px solid #ccc; padding:5px;'/>");
                } else {
                    productsHtml.append("<p style='font-size:10px; color:grey;'>QR Code indisponível</p>");
                }
                productsHtml.append("</td>")
                        .append("</tr>")
                        .append("</table>");
            }

            String status = translateStatus(order.getStatus());
            String paymentMethod = translatePaymentMethod(order.getPaymentMethod().getMethod());

            template = template.replace("#{id}", order.getId().toString());
            template = template.replace("#{nome}", name);
            template = template.replace("#{dataHora}", dateTime);
            template = template.replace("#{status}", status);
            template = template.replace("#{pagamento}", paymentMethod);
            template = template.replace("#{desconto}", String.format("%.2f", order.getDiscount()));
            template = template.replace("#{parcelas}", order.getInstallment().toString());
            template = template.replace("#{parcelasValor}", String.format("%.2f", order.getInstallmentPrice()));
            template = template.replace("#{total}", String.format("%.2f", order.getTotal()));
            template = template.replace("#{produtos}", productsHtml.toString());
            template = template.replace("#{houseName}", house.getName());
            template = template.replace("#{street}", house.getAddress().getName());
            template = template.replace("#{number}", String.valueOf(house.getNumber()));
            template = template.replace("#{complement}", house.getComplement());
            template = template.replace("#{locality}", house.getAddress().getLocality());
            template = template.replace("#{state}", house.getAddress().getState());
            template = template.replace("#{cep}", house.getAddress().getCep());

            helper.setText(template, true);

            javaMailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
            throw new FailedSendEmailException("Failed to send email");
        }
    }

    public String loadEmailTemplate() throws IOException {
        ClassPathResource resource = new ClassPathResource("templates/orders-update-email.html");
        return new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
    }

    private String translateStatus(OrderStatus status) {
        return switch (status) {
            case FINISHED -> "Finalizado";
            case WAITING -> "Aguardando";
            case SHIPPED -> "Enviado";
            case CANCELED -> "Cancelado";
        };
    }

    private String translatePaymentMethod(String method) {
        return switch (method) {
            case "Pix" -> "Pix";
            case "BankSlip" -> "Boleto";
            case "Credit" -> "Cartão de Crédito";
            case "Debit" -> "Cartão de Débito";
            default -> "Não informado";
        };
    }
}
