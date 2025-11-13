package com.incognidex.base.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager; // << NOVO IMPORT
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken; // << NOVO IMPORT
import org.springframework.security.core.AuthenticationException; // << NOVO IMPORT
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.incognidex.base.model.User;
import com.incognidex.base.service.AuthService;
import com.incognidex.base.service.JwtService; // << NOVO IMPORT

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService; // << NOVA INJEÇÃO
    private final AuthenticationManager authenticationManager; // << NOVA INJEÇÃO

    // Construtor atualizado para injetar os novos serviços
    public AuthController(
            AuthService authService,
            JwtService jwtService,
            AuthenticationManager authenticationManager) {
        this.authService = authService;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody Map<String, String> payload) {
        // Seu método de registro original (sem alterações)
        try {
            String username = payload.get("username");
            String email = payload.get("email");
            String password = payload.get("password");
            User registeredUser = authService.registerUser(username, email, password);
            return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody Map<String, String> payload) {
        try {
            String identifier = payload.get("username");
            String password = payload.get("password");

            // 1. Autentica o usuário (verifica se usuário e senha batem)
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(identifier, password));

            // 2. Busca os dados do usuário (após a autenticação ser bem-sucedida)
            // (Você talvez precise criar este método no seu AuthService)
            User user = authService.findUserByIdentifier(identifier);

            // 3. Gera o Token JWT para este usuário
            String token = jwtService.generateToken(user.getUsername());

            // 4. Cria o mapa para a resposta JSON (CORRIGIDA)
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("token", token); // << ADICIONADO: O TOKEN QUE FALTAVA
            response.put("username", user.getUsername());
            response.put("avatarUrl", user.getAvatarUrl());

            return ResponseEntity.ok(response);

        } catch (AuthenticationException e) {
            // Em caso de falha (usuário ou senha errados)
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Credenciais inválidas.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> payload) {
        // Seu método original (sem alterações)
        String email = payload.get("email");
        authService.createPasswordResetTokenForUser(email);
        return ResponseEntity
                .ok("Se o e-mail estiver cadastrado, um link de redefinição de senha foi enviado para ele.");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> payload) {
        // Seu método original (sem alterações)
        try {
            String token = payload.get("token");
            String newPassword = payload.get("newPassword");
            authService.resetPassword(token, newPassword);
            return ResponseEntity.ok("Senha redefinida com sucesso!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}