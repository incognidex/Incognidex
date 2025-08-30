package com.incognidex.base.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.incognidex.base.Model.UsuarioModel;

// que é um repositório por estender JpaRepository.
@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioModel, Long> {

}