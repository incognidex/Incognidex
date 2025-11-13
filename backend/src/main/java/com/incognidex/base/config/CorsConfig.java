package com.incognidex.base.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        registry.addMapping("/api/**") // Aplica a todas as rotas da API
                .allowedOrigins(
                        "http://localhost:5500",        // Para testes locais
                        "https://www.incognidex.com.br", // Seu domínio principal
                        "https://incognidex.com.br"      // Seu domínio sem 'www'
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Métodos permitidos
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}