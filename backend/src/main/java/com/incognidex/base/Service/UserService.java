package com.incognidex.base.service;

import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.incognidex.base.model.User;
import com.incognidex.base.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User updateProfile(Integer id, Map<String, String> payload) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User existingUser = userOptional.get();
            existingUser.setUsername(payload.get("username"));
            existingUser.setFullName(payload.get("nomeCompleto"));
            existingUser.setBiografia(payload.get("biografia"));
            existingUser.setInteressesAcademicos(payload.get("interessesAcademicos"));
            return userRepository.save(existingUser);
        }
        return null;
    }
}