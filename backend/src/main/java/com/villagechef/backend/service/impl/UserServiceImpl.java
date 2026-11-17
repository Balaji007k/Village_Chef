package com.villagechef.backend.service.impl;

import com.villagechef.backend.dto.AuthResponse;
import com.villagechef.backend.dto.LoginRequest;
import com.villagechef.backend.dto.RegisterRequest;
import com.villagechef.backend.entity.User;
import com.villagechef.backend.repository.UserRepository;
import com.villagechef.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return AuthResponse.builder()
                    .status("error")
                    .message("Email is already registered")
                    .build();
        }

        String hashedPassword = hashPassword(request.getPassword());
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(hashedPassword)
                .role("USER")
                .build();

        User savedUser = userRepository.save(user);

        return AuthResponse.builder()
                .status("success")
                .message("User registered successfully")
                .id(savedUser.getId())
                .name(savedUser.getName())
                .email(savedUser.getEmail())
                .role(savedUser.getRole())
                .token("mock-user-token-" + savedUser.getId())
                .build();
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isEmpty()) {
            return AuthResponse.builder()
                    .status("error")
                    .message("Invalid email or password")
                    .build();
        }

        User user = userOpt.get();
        String hashedInputPassword = hashPassword(request.getPassword());
        if (!user.getPassword().equals(hashedInputPassword)) {
            return AuthResponse.builder()
                    .status("error")
                    .message("Invalid email or password")
                    .build();
        }

        return AuthResponse.builder()
                .status("success")
                .message("Login successful")
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .token("mock-" + user.getRole().toLowerCase() + "-token-" + user.getId())
                .build();
    }

    private String hashPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] encodedhash = digest.digest(password.getBytes(java.nio.charset.StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder(2 * encodedhash.length);
            for (byte b : encodedhash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 algorithm not found", e);
        }
    }
}
