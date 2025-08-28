package com.incognidex.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "materia")
@Data
public class Materia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nome;

    @Column(columnDefinition = "TEXT")
    private String descricao;
}