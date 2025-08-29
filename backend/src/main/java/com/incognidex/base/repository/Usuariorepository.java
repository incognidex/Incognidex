package com.incognidex.base.repository;
import com.incognidex.base.model.UsuarioModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public class Usuariorepository {

@Repository
public interface Usuariorepository extends JpaRepository<UsuarioModel, Integer> {


}

public static void save(UsuarioModel usuario) {
    throw new UnsupportedOperationException("Unimplemented method 'save'");
}
}
