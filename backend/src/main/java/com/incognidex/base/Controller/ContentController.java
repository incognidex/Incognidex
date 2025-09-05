package com.incognidex.base.Controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.incognidex.base.Repository.ContentRepository;
import com.incognidex.base.Repository.SubjectRepository;
import com.incognidex.base.Repository.UsuarioRepository;
import com.incognidex.base.Model.Content;
import com.incognidex.base.Model.Subject;
import com.incognidex.base.Model.UsuarioModel;
import com.incognidex.base.dto.ContentCreateDTO;

@RestController
@RequestMapping("/api")
public class ContentController {

    @Autowired
    private ContentRepository contentRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/conteudo")
    public ResponseEntity<?> criarConteudo(@RequestBody ContentCreateDTO dto, Principal principal) {
        if (dto.title() == null || dto.body() == null || dto.contentType() == null || dto.subjectId() == null) {
            return ResponseEntity.badRequest().body("Preencha todos os campos obrigatórios");
        }

        UsuarioModel autor = usuarioRepository.findByUsername(principal.getName());
        if (autor == null) {
            return ResponseEntity.badRequest().body("Usuário não encontrado");
        }

        Subject subject = subjectRepository.findById(dto.subjectId()).orElse(null);
        if (subject == null) {
            return ResponseEntity.badRequest().body("Matéria não encontrada");
        }

        Content content = new Content();
        content.setTitle(dto.title());
        content.setBody(dto.body());
        content.setContentType(dto.contentType());
        content.setSubject(subject);
        content.setAuthor(autor);

        Content salvo = contentRepository.save(content);
        return ResponseEntity.status(201).body(salvo);
    }
}
