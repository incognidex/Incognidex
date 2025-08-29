package com.incognidex.base.model;

public class UsuarioModel {
    private int id;
    private String username;
    private String email;
    private String nomeCompleto;
    private String urlFoto;
    private String biografia;
    private String interessesAcademicos;


public UsuarioModel(){
}
public UsuarioModel(int id, String username, String email, String senha, String nomeCompleto, String urlFoto, String biografia, String interessesAcademicos) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.nomeCompleto = nomeCompleto;
        this.urlFoto = urlFoto;
        this.biografia = biografia;
        this.interessesAcademicos = interessesAcademicos;
    }
    public int getId() {
        return id;
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
    public static UsuarioModel findById(int id) {
        return null;
    }

    public void save(UsuarioModel usuario) {
    }
    public static UsuarioModel buscarPorId(Object usuarioIdLogado) {

        throw new UnsupportedOperationException("Unimplemented method 'buscarPorId'");
    }
}