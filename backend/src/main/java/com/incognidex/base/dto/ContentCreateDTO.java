package com.incognidex.base.dto;

import com.incognidex.base.Model.ContentType;

public record ContentCreateDTO(
        String title,
        String body,
        ContentType contentType,
        Integer subjectId) {
}