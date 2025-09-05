package com.incognidex.base.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.incognidex.base.model.UsuarioModel;

@Repository
public interface Usuariorepository extends JpaRepository<UsuarioModel, Integer> {

    UsuarioModel findByUsername(String name);

}