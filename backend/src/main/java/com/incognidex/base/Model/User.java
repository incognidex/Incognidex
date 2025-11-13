package com.incognidex.base.model;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // É crucial que username e email sejam únicos
    @Column(nullable = false, length = 50, unique = true) // << unique = true
    private String username;

    @Column(nullable = false, length = 100, unique = true) // << unique = true
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "nome_completo", length = 150)
    private String fullName;

    @Column(name = "biografia")
    private String biografia;

    @Column(name = "interesses_academicos")
    private String interessesAcademicos;

    @Column(name = "url_foto", length = 255)
    private String avatarUrl;

    @Column(name = "banner_color", length = 7)
    private String bannerColor;

    @Column
    private String resetToken;

    @Column(name = "criacao", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "atualizacao")
    private LocalDateTime updatedAt;

    // Construtores
    public User() {
    }

    // Getters e Setters (Seus getters e setters originais vêm aqui...)
    // ... (id, username, email, passwordHash, fullName, etc.) ...

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Override
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

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    // ... (Todos os outros getters/setters) ...

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
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

    public void setInteressesAcademicos(String ia) {
        this.interessesAcademicos = ia;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getBannerColor() {
        return bannerColor;
    }

    public void setBannerColor(String bannerColor) {
        this.bannerColor = bannerColor;
    }

    public String getResetToken() {
        return resetToken;
    }

    public void setResetToken(String resetToken) {
        this.resetToken = resetToken;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    // --- MÉTODOS OBRIGATÓRIOS DO UserDetails ---

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Define uma permissão (role) padrão para todos os usuários.
        // Você pode criar um campo @Enumerated para Roles se precisar de ADMIN, USER,
        // etc.
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword() {
        // Retorna o campo que contém a senha (hash)
        return passwordHash;
    }

    // getUsername() já foi implementado acima

    @Override
    public boolean isAccountNonExpired() {
        // Define que a conta nunca expira
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // Define que a conta nunca é bloqueada
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // Define que as credenciais (senha) nunca expiram
        return true;
    }

    @Override
    public boolean isEnabled() {
        // Define que o usuário está sempre habilitado
        return true;
    }

    // --- Métodos de Ciclo de Vida do JPA ---
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}