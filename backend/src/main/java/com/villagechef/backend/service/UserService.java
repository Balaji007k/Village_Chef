package com.villagechef.backend.service;

import com.villagechef.backend.dto.LoginRequest;
import com.villagechef.backend.dto.RegisterRequest;
import com.villagechef.backend.dto.AuthResponse;

public interface UserService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}
