package com.incognidex.base.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthFilter, AuthenticationProvider authenticationProvider) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.authenticationProvider = authenticationProvider;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Desabilita CSRF (não necessário para APIs REST)
                .csrf(csrf -> csrf.disable())

                // Habilita o CORS e usa o CorsConfig (WebMvcConfigurer)
                .cors(cors -> {
                })

                // Regras de autorização
                .authorizeHttpRequests(auth -> auth
                        // Libera OPTIONS para pré-flight (CORS)
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Endpoints públicos
                        .requestMatchers("/api/auth/**").permitAll()

                        // Todos os outros exigem autenticação
                        .anyRequest().authenticated())

                // Define autenticação stateless (sem sessão)
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // Define o provedor de autenticação
                .authenticationProvider(authenticationProvider)

                // Adiciona o filtro JWT antes do filtro padrão de autenticação
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
