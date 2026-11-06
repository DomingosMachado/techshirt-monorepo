package br.com.techshirt.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    private SecurityFilter securityFilter;

    @Value("${app.cors.allowed-origins}")
    private String[] allowedOrigins;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> {
                    auth.requestMatchers("/h2-console/**").permitAll()
                        .requestMatchers("/swagger-ui/**").permitAll()
                        .requestMatchers("/v3/api-docs/**").permitAll()

                        .requestMatchers(HttpMethod.POST,"/auth/user").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/verify-2fa").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.POST, "/2fa/**").hasAnyRole("ADMIN", "USER")

                        .requestMatchers(HttpMethod.GET, "/users").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/users/").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/users/email").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/users").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/users").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.PUT, "/users/active/").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/users").hasAnyRole("ADMIN", "USER")

                        .requestMatchers(HttpMethod.GET, "/roles/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/roles/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/roles/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/roles/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET, "/contacts/user").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.GET, "/contacts/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/contacts").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.PUT, "/contacts/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/contacts/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET, "/orders/user").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.GET, "/orders/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/orders").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.PUT, "/orders/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/orders/cancel/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET, "/paymentMethods/user").permitAll()
                        .requestMatchers(HttpMethod.GET, "/paymentMethods/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/paymentMethods/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/paymentMethods/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/paymentMethods/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET, "/qrcode/**").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.POST, "/qrcode/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/qrcode/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/qrcode/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET, "/products/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/products/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/products/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/products/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET, "/productsStock/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/productsStock/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/productsStock/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/productsStock/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET, "/product_images/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/product_images/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/product_images/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/product_images/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET, "/categories/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/categories/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/categories/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/categories/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET, "/address/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/address/**").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.PUT, "/address/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/address/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET, "/houses/user").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.GET, "/houses/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/houses").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.PUT, "/houses/**").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.DELETE, "/houses/").hasAnyRole("ADMIN", "USER");

                    auth.anyRequest().authenticated();
                })
                .headers(headers -> headers.frameOptions().disable())
                .addFilterBefore(securityFilter, BasicAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList(allowedOrigins));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
