package com.incognidex.base.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.incognidex.base.model.Content;
import com.incognidex.base.model.Subject;
import com.incognidex.base.model.UsuarioModel;
import com.incognidex.base.dto.ContentCreateDTO;
import com.incognidex.base.repository.ContentRepository;
import com.incognidex.base.repository.SubjectRepository;
import com.incognidex.base.repository.Usuariorepository;

@RestController
@RequestMapping("/api")
public class ContentController {

    @Autowired
    private ContentRepository contentRepository;

    @Autowired
    private Usuariorepository usuarioRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/conteudo")
    public ResponseEntity<?> criarConteudo(@RequestBody ContentCreateDTO dto, Principal principal) {
        if (dto.getTitle() == null || dto.getBody() == null || dto.getContentType() == null || dto.getSubjectId() == null) {
            return ResponseEntity.badRequest().body("Preencha todos os campos obrigatórios");
        }

        UsuarioModel autor = usuarioRepository.findByUsername(principal.getName());
        if (autor == null) {
            return ResponseEntity.badRequest().body("Usuário não encontrado");
        }

        Subject subject = subjectRepository.findById(dto.getSubjectId()).orElse(null);
        if (subject == null) {
            return ResponseEntity.badRequest().body("Matéria não encontrada");
        }

        Content content = new Content();
        content.setTitle(dto.getTitle());
        content.setBody(dto.getBody());
        content.setContentType(dto.getContentType());
        content.setSubject(subject);
        content.setAuthor(autor);

        Content salvo = contentRepository.save(content);
        return ResponseEntity.status(201).body(salvo);
    }
}
