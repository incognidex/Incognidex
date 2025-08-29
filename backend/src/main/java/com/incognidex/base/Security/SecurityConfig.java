package com.incognidex.base.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; // 👈 Importe o BCrypt
import org.springframework.security.crypto.password.PasswordEncoder; // 👈 Importe o PasswordEncoder
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Desabilitar CSRF para simplificar a comunicação com o frontend
            .authorizeHttpRequests((requests) -> requests
                .requestMatchers("/", "/index.html", "/login.html", "/css/**", "/js/**").permitAll()
                .anyRequest().authenticated()
            )
            .formLogin((form) -> form
                .loginPage("/login.html")
                .loginProcessingUrl("/login")
                .defaultSuccessUrl("http://localhost:5173/dashboard.html", true) // Use a URL completa do frontend
                .failureUrl("/login.html?error=true")
                .permitAll()
            )
            .logout((logout) -> logout
                .logoutSuccessUrl("/login.html")
                .permitAll());

        return http.build();
    }

    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails user = User.builder()
            .username("user")
            // A senha "password" será codificada com BCrypt
            .password(passwordEncoder().encode("password"))
            .roles("USER")
            .build();

        return new InMemoryUserDetailsManager(user);
    }
}