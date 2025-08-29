package com.incognidex.base.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.incognidex.base.model.Content;

@Repository
public interface ContentRepository extends JpaRepository<Content, Integer> {
    // CORREÇÃO: Adicionada a chave de fechamento }
}