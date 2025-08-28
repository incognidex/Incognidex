package com.incognidex.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "conteudo")
@Data
public class Conteudo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String titulo;

    @Column(columnDefinition = "TEXT")
    private String corpo;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_conteudo")
    private TipoConteudo tipoConteudo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "materia_id", nullable = false)
    private Materia materia;
}