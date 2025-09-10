package com.incognidex.base.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.incognidex.base.model.PasswordResetToken;
import com.incognidex.base.model.User;
import com.incognidex.base.repository.PasswordResetTokenRepository;
import com.incognidex.base.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final PasswordResetTokenRepository tokenRepository;
    private final JavaMailSender mailSender;

    public AuthService(
        UserRepository userRepository,
        PasswordEncoder passwordEncoder,
        PasswordResetTokenRepository tokenRepository,
        JavaMailSender mailSender
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenRepository = tokenRepository;
        this.mailSender = mailSender;
    }

    public User registerUser(String username, String email, String password) {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new IllegalArgumentException("Username already exists.");
        }
        if (userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("Email already exists.");
        }

        User newUser = new User();
        newUser.setUsername(username);
        newUser.setEmail(email);
        newUser.setPasswordHash(passwordEncoder.encode(password));
        return userRepository.save(newUser);
    }

    public void createPasswordResetTokenForUser(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("Email não encontrado.");
        }
        User user = userOptional.get();
        String token = UUID.randomUUID().toString();

        PasswordResetToken myToken = new PasswordResetToken(token, user, LocalDateTime.now().plusHours(24));
        tokenRepository.save(myToken);

        String appUrl = ServletUriComponentsBuilder.fromCurrentContextPath().toUriString();

        SimpleMailMessage emailMessage = new SimpleMailMessage();
        emailMessage.setTo(user.getEmail());
        emailMessage.setSubject("Incognidex - Redefinir Senha");
        emailMessage.setText("Para redefinir sua senha, clique no link abaixo:\n" + appUrl + "/reset-password?token=" + token);
        mailSender.send(emailMessage);
    }

    public void resetPassword(String token, String newPassword) {
        Optional<PasswordResetToken> tokenOptional = tokenRepository.findByToken(token);
        if (tokenOptional.isEmpty()) {
            throw new IllegalArgumentException("Token inválido.");
        }
        PasswordResetToken resetToken = tokenOptional.get();
        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Token expirado.");
        }

        User user = resetToken.getUser();
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        tokenRepository.delete(resetToken);
    }
}