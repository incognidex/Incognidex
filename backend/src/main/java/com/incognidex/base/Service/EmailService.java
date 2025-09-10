package com.incognidex.base.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendPasswordResetEmail(String toEmail, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("seu-email@gmail.com"); // Altere aqui
        message.setTo(toEmail);
        message.setSubject("Incognidex - Redefinição de Senha");
        message.setText("Para redefinir sua senha, clique no link a seguir: http://localhost:5500/reset-password.html?token=" + token);

        mailSender.send(message);
    }
}