package com.incognidex.base.controller;

import java.util.List;
import java.util.Optional; // Garanta que a importação está correta

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.incognidex.base.model.UsuarioModel;
import com.incognidex.base.service.UsuarioService;

@RestController
@RequestMapping("/api/usuarios") // Um endpoint base comum para os usuários
public class UsersController {

    @Autowired
    private UsuarioService usuarioService;

    // Endpoint para criar um novo usuário
    @PostMapping
    public UsuarioModel criarUsuario(@RequestBody UsuarioModel usuario) {
        return usuarioService.salvarUsuario(usuario);
    }

    // Endpoint para listar todos os usuários
    @GetMapping
    public List<UsuarioModel> listarTodosUsuarios() {
        return usuarioService.listarTodos();
    }

    /**
     * Endpoint para buscar um usuário por ID.
     * O tipo do ID no @PathVariable e no método foi corrigido para Integer.
     */
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioModel> buscarUsuarioPorId(@PathVariable Integer id) { // <-- CORREÇÃO AQUI
        Optional<UsuarioModel> usuario = usuarioService.buscarPorId(id);

        // Retorna o usuário se encontrado, ou um status 404 (Not Found) se não.
        return usuario.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }

    // Endpoint para deletar um usuário
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarUsuario(@PathVariable Integer id) { // <-- CORREÇÃO AQUI TAMBÉM
        usuarioService.deletarPorId(id);
        return ResponseEntity.noContent().build(); // Retorna um status 204 (No Content)
    }

    // Você pode adicionar um endpoint para atualizar (PUT) também
    // ...
}