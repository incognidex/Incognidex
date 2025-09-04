package com.incognidex.base.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.incognidex.base.Model.Subject;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Integer> {
}