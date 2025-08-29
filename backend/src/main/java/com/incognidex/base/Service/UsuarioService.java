package com.incognidex.base.service;

import java.util.List;
import java.util.Optional;

import com.incognidex.base.model.UsuarioModel;

public interface UsuarioService {

    UsuarioModel salvarUsuario(UsuarioModel usuario);

    Optional<UsuarioModel> buscarPorId(Long id);

    List<UsuarioModel> listarTodos();

    void deletarPorId(Long id);
}