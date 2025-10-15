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

    public User updateProfile(
        String currentUsername,
        String newUsername,
        String newFullName,
        String newBiografia,
        String newInteressesAcademicos,
        String bannerColor,
        MultipartFile fotoPerfil) throws IOException, IllegalAccessException {

        Optional<User> userOptional = userRepository.findByUsername(currentUsername);
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("Usuário não encontrado.");
        }

        User user = userOptional.get();

        // Lógica de upload da foto
        if (fotoPerfil != null && !fotoPerfil.isEmpty()) {
            //Validação de tipo
            String contentType = fotoPerfil.getContentType();
            if(contentType == null || !(contentType.equals("image/jpeg") ||
            contentType.equals("image/png"))){
                throw new IllegalAccessError("Apenas arquivos JPEG ou PNG são permitidos.");
            }

            long maxSize = 2 * 1024 * 1024; // 2MB
            if(fotoPerfil.getSize() > maxSize){
                throw new IllegalAccessException("O arquivo deve ter no máximo 2MB.");
            }

            String fileName = UUID.randomUUID().toString() + "_" + fotoPerfil.getOriginalFilename();
            Path uploadPath = Paths.get(UPLOAD_DIR);

            // Cria o diretório de uploads se não existir
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(fileName);
            Files.copy(fotoPerfil.getInputStream(), filePath);

            // Define a URL da foto
            String fileUrl = "/api/images/" + fileName;
            user.setAvatarUrl(fileUrl);
        }

        // Atualiza os outros dados do usuário
        if (!user.getUsername().equals(newUsername)) {
            if (userRepository.findByUsername(newUsername).isPresent()) {
                throw new IllegalArgumentException("Nome de usuário já está em uso.");
            }
            user.setUsername(newUsername);
        } else {
            user.setUsername(newUsername);
        }
        user.setFullName(newFullName);
        user.setBiografia(newBiografia);
        user.setInteressesAcademicos(newInteressesAcademicos);
        user.setBannerColor(bannerColor);

        return userRepository.save(user);
    }
}