package com.incognidex.base.controller;

import java.io.IOException;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.incognidex.base.model.BannerUpdateRequest;
import com.incognidex.base.model.User;
import com.incognidex.base.model.UserProfileResponse;
import com.incognidex.base.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/profile")
public class UserProfileController {

    private final UserService userService;

    public UserProfileController(UserService userService) {
        this.userService = userService;
    }

    // GET perfil por username
    @GetMapping("/{username}")
    public ResponseEntity<UserProfileResponse> getUserProfile(@PathVariable String username) {
        
        Optional<UserProfileResponse> userProfileOptional = userService.getUserProfileByUsername(username);

        if (userProfileOptional.isPresent()) {
            
            return new ResponseEntity<>(userProfileOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
 
    @PutMapping("/banner")
    public ResponseEntity<String> updateUserBanner(
            @RequestBody BannerUpdateRequest bannerRequest,
            HttpServletRequest request) {
        
        String currentUsername = request.getHeader("X-User-Username");
        if (currentUsername == null || currentUsername.isEmpty()) {
            return new ResponseEntity<>("Usuário não autenticado.", HttpStatus.UNAUTHORIZED);
        }
        try {
            userService.updateUserBanner(currentUsername, bannerRequest.getBannerColor());
            return new ResponseEntity<>("Cor do banner atualizada com sucesso!", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/edit")
    public ResponseEntity<?> UpdateProfile(
            @RequestParam(value = "username", required = false) String newUsername,
            @RequestParam(value = "nomeCompleto", required = false) String newFullName,
            @RequestParam(value = "biografia", required = false) String newBiografia,
            @RequestParam(value = "interessesAcademicos", required = false) String newInteressesAcademicos,
            @RequestParam(value = "bannerColor", required = false) String bannerColor,
            @RequestParam(value = "fotoPerfil", required = false) MultipartFile fotoPerfil,
            @RequestHeader(value = "X-User-Username", required = false) String currentUsernameHeader
    ) throws IllegalAccessException {
        try {
            // obter username do header
            String currentUsername = currentUsernameHeader;
            if (currentUsername == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não autenticado");
            }

            User updated = userService.updateProfile(
                    currentUsername,
                    newUsername,
                    newFullName,
                    newBiografia,
                    newInteressesAcademicos,
                    bannerColor,
                    fotoPerfil
            );
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao salvar arquivo.");
        }
    }
    
}