package com.incognidex.base.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.incognidex.base.model.UsuarioModel;

// que é um repositório por estender JpaRepository.
@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioModel, Long> {

}