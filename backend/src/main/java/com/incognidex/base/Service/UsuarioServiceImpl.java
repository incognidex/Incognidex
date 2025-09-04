package com.incognidex.base.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.incognidex.base.model.UsuarioModel;
import com.incognidex.base.repository.UsuarioRepository;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UsuarioModel salvarUsuario(UsuarioModel usuario) {
        return usuarioRepository.save(usuario);
    }

    /**
     * O tipo do ID foi corrigido para Integer para corresponder à interface e ao repositório.
     */
    @Override
    public Optional<UsuarioModel> buscarPorId(Integer id) { // <-- CORRIGIDO
        return usuarioRepository.findById(id);
    }

    @Override
    public List<UsuarioModel> listarTodos() {
        return usuarioRepository.findAll();
    }

    /**
     * O tipo do ID também foi corrigido aqui.
     */
    @Override
    public void deletarPorId(Integer id) { // <-- CORRIGIDO
        usuarioRepository.deleteById(id);
    }
}