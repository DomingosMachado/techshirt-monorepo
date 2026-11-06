package br.com.techshirt.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {
    @Value("${swagger_dev_url:http://localhost:8080}")
    private String devUrl;

    @Value("${swagger_prod_url:http://localhost:8080}")
    private String prodUrl;

    @Bean
    OpenAPI myOpenAPI() {
        Server devServer = new Server();
        devServer.setUrl(devUrl);
        devServer.setDescription("URL do servidor de desenvolvimento");

        Server prodServer = new Server();
        prodServer.setUrl(prodUrl);
        prodServer.setDescription("URL do servidor de produção");

        Contact contact = new Contact();
        contact.setEmail("contact@example.com");
        contact.setName("TechShirts");
        contact.setUrl("https://example.com");

        License license = new License().name("MIT License")
                .url("https://opensource.org/licenses/MIT");

        Info info = new Info().title("TechShirt API")
                .version("1.0")
                .contact(contact)
                .description("REST API for TechShirt, a demo e-commerce store that sells t-shirts with QR codes linking to digital courses.")
                .license(license);

        SecurityScheme securityScheme = new SecurityScheme()
                .name("Authorization")
                .type(SecurityScheme.Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT")
                .description("Insira o token JWT no campo abaixo. Exemplo: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...");

        SecurityRequirement securityRequirement = new SecurityRequirement().addList("Authorization");

        return new OpenAPI()
                .info(info)
                .servers(List.of(devServer, prodServer))
                .addSecurityItem(securityRequirement)
                .components(new Components().addSecuritySchemes("Authorization", securityScheme));
    }
}
