package com.ecommerceapp.home.security;

import java.util.List; // Importar List

public class AuthResponse {
    private String token;
    private List<String> roles; // Añadir este campo

    // Constructor actualizado
    public AuthResponse(String token, List<String> roles) {
        this.token = token;
        this.roles = roles;
    }

    // Getters
    public String getToken() {
        return token;
    }

    public List<String> getRoles() {
        return roles;
    }
}