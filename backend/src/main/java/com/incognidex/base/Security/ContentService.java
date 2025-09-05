package com.incognidex.base.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.incognidex.base.dto.ContentCreateDTO;
import com.incognidex.base.model.Content;
import com.incognidex.base.model.Subject;
import com.incognidex.base.repository.ContentRepository;
import com.incognidex.base.repository.SubjectRepository;

@Service
public class ContentService {

    @Autowired
    private ContentRepository contentRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Transactional
    public Content createContent(ContentCreateDTO dto) {
        Subject subject = subjectRepository.findById(dto.getSubjectId())
                .orElseThrow(() -> new RuntimeException("Subject not found with id: " + dto.getSubjectId()));

        Content newContent = new Content();

        newContent.setTitle(dto.getTitle());
        newContent.setBody(dto.getBody());
        newContent.setContentType(dto.getContentType());
        newContent.setSubject(subject);

        return contentRepository.save(newContent);
    }
}