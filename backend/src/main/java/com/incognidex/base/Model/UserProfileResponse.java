package com.incognidex.base.model;

public class UserProfileResponse {

    private final String username;
    private final String fullName;
    private final String biografia;
    private final String interessesAcademicos;
    private final String avatarUrl;
    private final String bannerColor;

    // Um construtor especial que recebe um objeto User e "filtra" os campos.
    public UserProfileResponse(User user) {
        this.username = user.getUsername();
        this.fullName = user.getFullName();
        this.biografia = user.getBiografia();
        this.interessesAcademicos = user.getInteressesAcademicos();
        this.avatarUrl = user.getAvatarUrl();
        this.bannerColor = user.getBannerColor();
    }

    // Getters para todos os campos
    public String getUsername() {
        return username;
    }

    public String getFullName() {
        return fullName;
    }

    public String getBiografia() {
        return biografia;
    }

    public String getInteressesAcademicos() {
        return interessesAcademicos;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public String getBannerColor() {
        return bannerColor;
    }
}
