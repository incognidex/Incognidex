package com.incognidex.base.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.incognidex.base.model.User;
import com.incognidex.base.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private static final String UPLOAD_DIR = "uploads/";

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User updateProfileAndPhoto(
        String currentUsername,
        String newUsername,
        String newFullName,
        String newBiografia,
        String newInteressesAcademicos,
        MultipartFile file) throws IOException {

        Optional<User> userOptional = userRepository.findByUsername(currentUsername);
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("Usuário não encontrado.");
        }

        User user = userOptional.get();

        // Lógica de upload da foto
        if (file != null && !file.isEmpty()) {
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path uploadPath = Paths.get(UPLOAD_DIR);

            // Cria o diretório de uploads se não existir
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath);

            // Define a URL da foto
            String fileUrl = "/api/images/" + fileName;
            user.setAvatarUrl(fileUrl);
        }

        // Atualiza os outros dados do usuário
        user.setUsername(newUsername);
        user.setFullName(newFullName);
        user.setBiografia(newBiografia);
        user.setInteressesAcademicos(newInteressesAcademicos);

        return userRepository.save(user);
    }
}