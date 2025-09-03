package com.incognidex.base.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.incognidex.base.Model.Content;

@Repository
public interface ContentRepository extends JpaRepository<Content, Integer> {
    // CORREÇÃO: Adicionada a chave de fechamento }
}