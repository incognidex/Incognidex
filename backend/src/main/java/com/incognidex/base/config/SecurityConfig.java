package com.incognidex.base.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

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
                // 1️⃣ Desabilita CSRF (para APIs REST)
                .csrf(csrf -> csrf.disable())

                // 2️⃣ Habilita o CORS com a configuração abaixo
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // 3️⃣ Regras de autorização
                .authorizeHttpRequests(auth -> auth
                        // Libera OPTIONS (pré-flight)
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Endpoints públicos
                        .requestMatchers("/api/auth/**").permitAll()

                        // Endpoints protegidos
                        .requestMatchers(HttpMethod.GET, "/api/profile/**").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/api/profile/edit").authenticated()

                        // Qualquer outra rota exige autenticação
                        .anyRequest().authenticated())

                // 4️⃣ Sessão stateless
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // 5️⃣ Autenticação JWT
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // 🔹 Configuração de CORS compatível com seu frontend
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(List.of(
                "https://www.incognidex.com.br",
                "https://incognidex.com.br",
                "http://localhost:5500" // para testes locais
        ));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // 🔧 Corrigido: inclui cabeçalhos personalizados e o wildcard
        configuration.setAllowedHeaders(List.of(
                "Authorization",
                "Content-Type",
                "X-User-Username",
                "X-Requested-With",
                "Accept",
                "*"));

        // 🔧 Expor headers úteis ao frontend
        configuration.setExposedHeaders(List.of("Authorization"));

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
