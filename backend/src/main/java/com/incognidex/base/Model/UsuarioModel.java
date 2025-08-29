package com.incognidex.base.model;

// Importações necessárias para as anotações do JPA
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * A anotação @Entity informa ao Hibernate que esta classe é uma entidade
 * que deve ser mapeada para uma tabela no banco de dados.
 */
@Entity
/**
 * A anotação @Table especifica o nome exato da tabela no banco de dados.
 * Isso garante que esta classe se conecte à tabela "users" que você criou.
 */
@Table(name = "users")
public class UsuarioModel {

    /**
     * @Id marca este campo como a chave primária (Primary Key) da tabela.
     */
    @Id
    /**
     * @GeneratedValue define como a chave primária é gerada.
     * GenerationType.IDENTITY é ideal para MySQL, pois usa a função AUTO_INCREMENT.
     */
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    /**
     * A anotação @Column é usada para mapear o campo para uma coluna específica.
     * Embora não seja obrigatório se os nomes forem iguais, é uma boa prática.
     */
    @Column(name = "username", unique = true, nullable = false)
    private String username;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    // Adicionei o campo da senha que estava faltando para o login
    @Column(name = "password_hash", nullable = false)
    private String password;

    @Column(name = "full_name")
    private String nomeCompleto;

    @Column(name = "avatar_url")
    private String urlFoto;

    // Métodos `save`, `findById`, etc., foram removidos.
    // O Spring Data JPA criará isso para você automaticamente em uma interface "Repository".

    // Construtores, Getters e Setters (seu código original aqui está ótimo)

    public UsuarioModel() {
    }

    public UsuarioModel(int id, String username, String email, String password, String nomeCompleto, String urlFoto) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.nomeCompleto = nomeCompleto;
        this.urlFoto = urlFoto;
    }

    // --- Getters e Setters ---
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
}