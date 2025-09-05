package com.incognidex.base.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.incognidex.base.model.UsuarioModel;
import com.incognidex.base.repository.Usuariorepository;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private Usuariorepository usuarioRepository;

    @Override
    public UsuarioModel salvarUsuario(UsuarioModel usuario) {
        return usuarioRepository.save(usuario);
    }

    @Override
    public Optional<UsuarioModel> buscarPorId(Integer id) {
        return usuarioRepository.findById(id);
    }

    @Override
    public List<UsuarioModel> listarTodos() {
        return usuarioRepository.findAll();
    }

    @Override
    public void deletarPorId(Integer id) {
        usuarioRepository.deleteById(id);
    }
}