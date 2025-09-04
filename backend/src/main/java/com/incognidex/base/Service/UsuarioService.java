package com.incognidex.base.Service;

import java.util.List;
import java.util.Optional;

import com.incognidex.base.Model.UsuarioModel;

public interface UsuarioService {

    UsuarioModel salvarUsuario(UsuarioModel usuario);

    // Altere o tipo do ID de Long para Integer aqui
    Optional<UsuarioModel> buscarPorId(Integer id);

    List<UsuarioModel> listarTodos();

    // E altere aqui também
    void deletarPorId(Integer id);
}