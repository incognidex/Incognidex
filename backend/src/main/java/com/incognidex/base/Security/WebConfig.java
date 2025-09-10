// CORREÇÃO: Pacote em minúsculas
package com.incognidex.base.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // This is a basic configuration. You can customize it as needed.
        http
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/api/public/**").permitAll() // Example public endpoint
                .anyRequest().authenticated()
            )
            .csrf(csrf -> csrf.disable()); // Disabling CSRF for stateless APIs, common for JWT

        return http.build();
    }
}