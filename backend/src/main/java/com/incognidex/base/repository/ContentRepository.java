package com.incognidex.base.repository;

import com.incognidex.base.model.Content; 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContentRepository extends JpaRepository<Content, Integer> { 
}