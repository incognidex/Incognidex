package com.incognidex.base.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.incognidex.base.model.Subject;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Integer> {

}