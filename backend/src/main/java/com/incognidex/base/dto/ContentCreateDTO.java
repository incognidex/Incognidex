package com.incognidex.base.dto;

import com.incognidex.base.model.ContentType;

public record ContentCreateDTO(
    String title, 
    String body, 
    ContentType contentType, 
    Integer subjectId 
) {}