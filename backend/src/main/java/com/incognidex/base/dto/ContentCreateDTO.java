package com.incognidex.base.dto;


import com.incognidex.base.model.Content.ContentType;

import lombok.Data;

@Data
public class ContentCreateDTO {

        private String title;

        private String body;

        private ContentType contentType; // The type is now correctly resolved.

        private Integer subjectId; // We only need the ID of the related subject.

        private Integer authorId; // And the ID of the author.
}