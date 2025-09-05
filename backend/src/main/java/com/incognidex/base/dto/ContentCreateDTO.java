package com.incognidex.base.dto;

import com.incognidex.base.model.Content.ContentType;

import lombok.Data;

@Data
public class ContentCreateDTO {

        // Título do conteúdo a ser criado
        private String title;

        // Corpo/texto do conteúdo
        private String body;

        // Tipo do conteúdo (ex: artigo, post, etc.)
        private ContentType contentType; // The type is now correctly resolved.

        // ID da matéria/assunto relacionado ao conteúdo
        private Integer subjectId; // We only need the ID of the related subject.

        // ID do autor (não é necessário se o backend associa pelo usuário autenticado)
        private Integer authorId; // And the ID of the author.
}