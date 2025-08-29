package com.incognidex.base.model;

import jakarta.persistence.*;
import lombok.Data;
import java.sql.Timestamp; 

@Entity
@Table(name = "content") 
@Data
public class Content {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "title") 
    private String title;

    @Column(name = "body", columnDefinition = "TEXT") 
    private String body;

    @Enumerated(EnumType.STRING)
    @Column(name = "content_type") 
    private ContentType contentType; 

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id") 
    private Subject subject; 

    @Column(name = "author_id")
    private Integer authorId;

    @Column(name = "created_at", updatable = false, insertable = false)
    private Timestamp createdAt;
}