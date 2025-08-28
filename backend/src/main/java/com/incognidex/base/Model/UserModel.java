package main.java.com.incognidex.base.Model;
import java.time.Instant;

import jakarta.persistence.*;

@Entity
@Table(name = users)
public class UserModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY,  length = 11)
    private Long id;

    @Column(nullable = false, unique = true,  length = 50)
    private String username;

    @Collumn(nullable= false,  length = 100)
    private String email;

    @Column(nullable = false,  length = 255)
    private String password_hash;

    @Collumn(nullable= true,  length = 150)
    private String full_name;

    @Collumn(nullable= true,  length = 255)
    private String avatar_url;

    @Collumn(nullable= false)
    private Instant created_at;

    @Collumn(nullable= false)
    private Instant update_at;

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password_hash;
    }

    public void setPassword(String password_hash) {
        this.password_hash = password_hash;
    }

    public String getFull_name() {
        return full_name;
    }

    public void setFull_name(String full_name) {
        this.full_name = full_name;
    }
    
    public String getAvatar_url() {
        return avatar_url;
    }

    public void setAvatar_url(String avatar_url) {
        this.avatar_url = avatar_url;
    }

    public Instant getCreated_at(){
        return created_at;
    }

    public Instant getUpdate_at(){
        return update_at;
    }
}

