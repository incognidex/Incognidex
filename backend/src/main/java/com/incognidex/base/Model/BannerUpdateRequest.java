package com.incognidex.base.model;

public class BannerUpdateRequest {

    private String bannerColor;

    // Construtor vazio (necessário para o Spring)
    public BannerUpdateRequest() {
    }

    // Getter - para o nosso código poder ler o valor
    public String getBannerColor() {
        return bannerColor;
    }

    // Setter - para o Spring poder colocar o valor vindo da internet aqui dentro
    public void setBannerColor(String bannerColor) {
        this.bannerColor = bannerColor;
    }
}