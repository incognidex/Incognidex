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
    private ContentRepository contentRepository; // Repositório para salvar conteúdos

    @Autowired
    private Usuariorepository usuarioRepository; // Repositório para buscar usuários

    @Autowired
    private SubjectRepository subjectRepository; // Repositório para buscar matérias

    /**
     * Endpoint protegido para criar um novo conteúdo.
     * Apenas usuários autenticados podem acessar.
     * O conteúdo criado será associado ao usuário autenticado.
     */
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/conteudo")
    public ResponseEntity<?> criarConteudo(@RequestBody ContentCreateDTO dto, Principal principal) {
        // Validação dos campos obrigatórios do DTO
        if (dto.getTitle() == null || dto.getBody() == null || dto.getContentType() == null
                || dto.getSubjectId() == null) {
            return ResponseEntity.badRequest().body("Preencha todos os campos obrigatórios");
        }

        // Busca o usuário autenticado pelo nome de usuário
        UsuarioModel autor = usuarioRepository.findByUsername(principal.getName());
        if (autor == null) {
            return ResponseEntity.badRequest().body("Usuário não encontrado");
        }

        // Busca a matéria (subject) pelo ID informado no DTO
        Subject subject = subjectRepository.findById(dto.getSubjectId()).orElse(null);
        if (subject == null) {
            return ResponseEntity.badRequest().body("Matéria não encontrada");
        }

        // Cria e preenche o objeto Content com os dados recebidos e associa o autor e a
        // matéria
        Content content = new Content();
        content.setTitle(dto.getTitle());
        content.setBody(dto.getBody());
        content.setContentType(dto.getContentType());
        content.setSubject(subject);
        content.setAuthor(autor);

        // Salva o conteúdo no banco de dados
        Content salvo = contentRepository.save(content);

        // Retorna o conteúdo salvo
        return ResponseEntity.status(201).body(salvo);
    }
}
