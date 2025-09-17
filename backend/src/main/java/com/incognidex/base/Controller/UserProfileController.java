package com.incognidex.base.controller;

import java.io.IOException;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.incognidex.base.model.User;
import com.incognidex.base.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/profile")
public class UserProfileController {

    private final UserService userService;

    public UserProfileController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{username}")
    public ResponseEntity<User> getUserProfile(@PathVariable String username) {
        Optional<User> userOptional = userService.findByUsername(username);
        if (userOptional.isPresent()) {
            return new ResponseEntity<>(userOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/edit")
    public ResponseEntity<User> updateProfile(
            @RequestParam("username") String newUsername,
            @RequestParam("nomeCompleto") String newFullName,
            @RequestParam("biografia") String newBiografia,
            @RequestParam("interessesAcademicos") String newInteressesAcademicos,
            @RequestParam(value = "file", required = false) MultipartFile file,
            HttpServletRequest request) {

        // Supondo que você tem uma forma de obter o nome de usuário autenticado
        // Por exemplo, usando um cabeçalho personalizado ou token JWT
        String currentUsername = request.getHeader("X-User-Username"); 

        try {
            User updatedUser = userService.updateProfileAndPhoto(
                currentUsername,
                newUsername,
                newFullName,
                newBiografia,
                newInteressesAcademicos,
                file
            );
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}