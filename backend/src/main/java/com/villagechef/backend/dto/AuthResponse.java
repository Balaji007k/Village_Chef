package com.villagechef.backend.dto;

public class AuthResponse {
    private String status;
    private String message;
    private Long id;
    private String name;
    private String email;
    private String role;
    private String token;

    public AuthResponse() {}

    public AuthResponse(String status, String message, Long id, String name, String email, String role, String token) {
        this.status = status;
        this.message = message;
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.token = token;
    }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String status;
        private String message;
        private Long id;
        private String name;
        private String email;
        private String role;
        private String token;

        public Builder status(String status) { this.status = status; return this; }
        public Builder message(String message) { this.message = message; return this; }
        public Builder id(Long id) { this.id = id; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder email(String email) { this.email = email; return this; }
        public Builder role(String role) { this.role = role; return this; }
        public Builder token(String token) { this.token = token; return this; }

        public AuthResponse build() {
            return new AuthResponse(status, message, id, name, email, role, token);
        }
    }
}
