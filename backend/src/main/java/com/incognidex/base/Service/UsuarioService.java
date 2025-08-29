package com.incognidex.base.Service;


import com.incognidex.base.model.UsuarioModel;
import com.incognidex.base.repository.Usuariorepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param; 
@Service
public class UsuarioService {

    public static final UsuarioModel UsuarioRepository = null;
    @Autowired
    private Usuariorepository usuarioRepository; 

     /**
     * @param id
     * @return
     */

     
    public UsuarioModel buscarPorId(int id) {
              return UsuarioModel.findById(id);
    }
     @Param(value = "") 
    public void atualizarPerfil(UsuarioModel usuario) {
    
        if (usuario.getNomeCompleto() == null || usuario.getNomeCompleto().trim().isEmpty()) {
            throw new IllegalArgumentException("O nome completo não pode ser vazio.");
        }
        UsuarioRepository.save(usuario);
    }
}

