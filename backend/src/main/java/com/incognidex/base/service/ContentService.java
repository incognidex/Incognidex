package com.incognidex.base.service;

import com.incognidex.base.dto.ContentCreateDTO; 
import com.incognidex.base.model.Content;       
import com.incognidex.base.model.Subject;     
import com.incognidex.base.repository.ContentRepository; 
import com.incognidex.base.repository.SubjectRepository; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContentService {

    @Autowired
    private ContentRepository contentRepository; 

    @Autowired
    private SubjectRepository subjectRepository; 

    public Content createContent(ContentCreateDTO dto) { 

        Subject subject = subjectRepository.findById(dto.subjectId()) 
                .orElseThrow(() -> new RuntimeException("Subject not found with ID: " + dto.subjectId())); // Atualizado

        Content newContent = new Content(); 

        newContent.setTitle(dto.title());             
        newContent.setBody(dto.body());               
        newContent.setContentType(dto.contentType()); 
        newContent.setSubject(subject);               

        return contentRepository.save(newContent); 
    }
}