package com.incognidex.base.controller;

import com.example.accessibility.service.AccessibilityService;
import com.example.accessibility.service.UserPreferences;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpServletRequest;

@Controller
public class AccessibilityController {

    private final AccessibilityService service;

    public AccessibilityController(AccessibilityService service) {
        this.service = service;
    }

    @GetMapping("/")
    public String index(Model model, HttpServletRequest request) {
        UserPreferences prefs = service.loadFromRequest(request);
        model.addAttribute("prefs", prefs);
        return "index";
    }

    @PostMapping("/api/preferences")
    @ResponseBody
    public ResponseEntity<UserPreferences> savePreferences(@RequestBody UserPreferences prefs, HttpServletResponse response) {
        // Persistir em cookie (simples). Em produção, persista em DB por usuário autenticado.
        service.saveToResponse(prefs, response);
        return ResponseEntity.ok(prefs);
    }

    @GetMapping("/api/transcript/{id}")
    @ResponseBody
    public ResponseEntity<String> getTranscript(@PathVariable String id) {
        // Em produção: buscar transcrição armazenada. Aqui retornamos exemplo.
        String transcript = "Transcrição de exemplo para o vídeo " + id +
                ".\nConteúdo falado: Olá! Este é um exemplo de legenda e transcrição.";
        return ResponseEntity.ok(transcript);
    }

    @GetMapping("/api/tts")
    public ResponseEntity<byte[]> generateTTS(@RequestParam String text,
                                                @RequestParam(defaultValue = "pt-BR") String lang) {
        // Placeholder: aqui você pode integrar com um serviço TTS (Polly, Azure, Google, TTS local).
        // Retornar 501 para indicar não implementado na base.
        return ResponseEntity.status(501)
                .body(("TTS não implementado. Recebido: " + text).getBytes());
    }
}

