package com.incognidex.base.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.incognidex.base.Model.UsuarioModel;
import com.incognidex.base.Service.UsuarioService;

@Controller
@RequestMapping("/usuarios")
public class UsersController {

    @Autowired
    private UsuarioService usuarioService;

    // A URL será algo como /usuarios/editar/1, onde 1 é o ID do usuário
    @GetMapping("/editar/{id}")
    public String exibirPaginaEdicao(@PathVariable("id") Long id, Model model) {

        // CORREÇÃO: Usamos .orElseThrow() para extrair o usuário do Optional
        // ou lançar uma exceção se ele не for encontrado.
        UsuarioModel usuario = usuarioService.buscarPorId(id)
                .orElseThrow(() -> new IllegalArgumentException("ID de usuário inválido: " + id));

        // Adiciona o usuário encontrado ao modelo para ser usado na página HTML
        model.addAttribute("usuario", usuario);

        // Retorna o nome do arquivo HTML (template)
        return "pagina-de-edicao";
    }
}