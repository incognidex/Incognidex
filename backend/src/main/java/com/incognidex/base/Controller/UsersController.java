package com.incognidex.base.controller; // Pacote em minúsculas

// Importações do Spring Framework
import java.util.List;
import java.util.Optional;

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
@RequestMapping("/api/usuarios")
public class UsersController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public UsuarioModel criarUsuario(@RequestBody UsuarioModel usuario) {
        return usuarioService.salvarUsuario(usuario);
    }

    @GetMapping
    public List<UsuarioModel> listarTodosUsuarios() {
        return usuarioService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioModel> buscarUsuarioPorId(@PathVariable Integer id) {
        Optional<UsuarioModel> usuario = usuarioService.buscarPorId(id);
        return usuario.map(ResponseEntity::ok)
                        .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarUsuario(@PathVariable Integer id) {
        usuarioService.deletarPorId(id);
        return ResponseEntity.noContent().build();
    }
}