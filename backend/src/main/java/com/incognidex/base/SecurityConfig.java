package com.incognidex.base;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration // Indica ao Spring que esta é uma classe de configuração, contendo definições de beans.
@EnableWebSecurity // Habilita a integração do Spring Security com o Spring MVC para configurar a segurança web.
public class SecurityConfig {

    @Bean // Anotação que diz ao Spring para registrar o retorno deste método como um bean no contexto da aplicação.
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception { // Define o "filtro de segurança" principal que interceptará as requisições.
        http // Inicia a configuração das regras de segurança.

            // --- CONFIGURAÇÕES GERAIS ---
            .csrf(csrf -> csrf.disable()) // Desabilita a proteção CSRF (Cross-Site Request Forgery), comum para APIs stateless que usam tokens (como JWT).

            // --- AUTORIZAÇÃO DE REQUISIÇÕES ---
            .authorizeHttpRequests(authorize -> authorize // Inicia a configuração de quais requisições HTTP devem ser autorizadas.
                // --- ROTAS PÚBLICAS (Acesso Liberado) ---
                .requestMatchers("/", "/index.html", "/login", "/cadastro").permitAll() // Permite o acesso sem autenticação a rotas específicas (página inicial, login, etc.).
                .requestMatchers("/api/auth/**").permitAll() // Permite o acesso sem autenticação a todos os endpoints que começam com "/api/auth/" (ex: /api/auth/login, /api/auth/register).

                // --- ROTAS PRIVADAS (Exigem Autenticação) ---
                .anyRequest().authenticated() // Exige que qualquer outra requisição não especificada acima seja autenticada.
            );

        return http.build(); // Constrói e retorna o objeto SecurityFilterChain com todas as regras configuradas.
    }
}