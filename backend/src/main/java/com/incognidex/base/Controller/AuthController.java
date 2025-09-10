package com.incognidex.base.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.incognidex.base.model.User;
import com.incognidex.base.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody Map<String, String> payload) {
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
    public ResponseEntity<String> loginUser(@RequestBody Map<String, String> payload) {
        // A lógica de login será manipulada pelo Spring Security.
        // Irá retornar uma mensagem de sucesso ou um token JWT aqui.
        return ResponseEntity.ok("Login successful");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> payload) {
        // Obtenha o email do corpo da requisição.
        String email = payload.get("email");
        authService.createPasswordResetTokenForUser(email); // Esta linha chama o serviço para criar o token e enviar o e-mail
        return ResponseEntity.ok("Se o e-mail estiver cadastrado, um link de redefinição de senha foi enviado para ele.");
    }
    @GetMapping("/reset-password")
    public ModelAndView showResetPasswordPage(@RequestParam("token") String token) {
        ModelAndView modelAndView = new ModelAndView("reset-password");
        modelAndView.addObject("token", token);
        return modelAndView;
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> payload) {
        try {
            String token = payload.get("token");
            String newPassword = payload.get("password");
            authService.resetPassword(token, newPassword);
            return ResponseEntity.ok("Senha redefinida com sucesso!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
