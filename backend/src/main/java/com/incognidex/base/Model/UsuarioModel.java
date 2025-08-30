package com.incognidex.base.Model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType; // Importação para usar data e hora
import jakarta.persistence.Id; // Importação para data de criação automática
import jakarta.persistence.Table; // Importação para data de atualização automática

@Entity
@Table(name = "users") // Conectando à tabela 'users' do seu script SQL original
public class UsuarioModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    // Corrigido para VARCHAR(50) conforme o MER
    @Column(name = "username", unique = true, nullable = false, length = 50)
    private String username;

    // Corrigido para VARCHAR(100) conforme o MER
    @Column(name = "email", unique = true, nullable = false, length = 100)
    private String email;

    // Mantido como password_hash e com 255 para armazenar a senha criptografada
    // (hash)
    // O VARCHAR(20) do MER é muito pequeno para uma senha segura.
    @Column(name = "password_hash", nullable = false, length = 255)
    private String password;

    // Corrigido para nome_completo e VARCHAR(100) conforme o MER
    @Column(name = "nome_completo", length = 100)
    private String nomeCompleto;

    // Corrigido para url_foto e VARCHAR(255) conforme o MER
    @Column(name = "url_foto", length = 255)
    private String urlFoto;

    // Campo adicionado conforme o MER
    @Column(name = "biografia", columnDefinition = "TEXT")
    private String biografia;

    // Campo adicionado conforme o MER
    @Column(name = "interesses_academicos", columnDefinition = "TEXT")
    private String interessesAcademicos;

    // Campo adicionado conforme o MER - será preenchido automaticamente
    @CreationTimestamp
    @Column(name = "criacao", nullable = false, updatable = false)
    private LocalDateTime criacao;

    // Campo adicionado conforme o MER - será atualizado automaticamente
    @UpdateTimestamp
    @Column(name = "atualizacao")
    private LocalDateTime atualizacao;

    // --- Construtores, Getters e Setters ---
    public UsuarioModel() {
    }

    // Getters e Setters para todos os campos...
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNomeCompleto() {
        return nomeCompleto;
    }

    public void setNomeCompleto(String nomeCompleto) {
        this.nomeCompleto = nomeCompleto;
    }

    public String getUrlFoto() {
        return urlFoto;
    }

    public void setUrlFoto(String urlFoto) {
        this.urlFoto = urlFoto;
    }

    public String getBiografia() {
        return biografia;
    }

    public void setBiografia(String biografia) {
        this.biografia = biografia;
    }

    public String getInteressesAcademicos() {
        return interessesAcademicos;
    }

    public void setInteressesAcademicos(String interessesAcademicos) {
        this.interessesAcademicos = interessesAcademicos;
    }

    public LocalDateTime getCriacao() {
        return criacao;
    }

    public void setCriacao(LocalDateTime criacao) {
        this.criacao = criacao;
    }

    public LocalDateTime getAtualizacao() {
        return atualizacao;
    }

    public void setAtualizacao(LocalDateTime atualizacao) {
        this.atualizacao = atualizacao;
    }
}