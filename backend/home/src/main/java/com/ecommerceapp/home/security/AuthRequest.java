package com.ecommerceapp.home.security;

public class AuthRequest {

    private String username;
    private String password;

    // Constructor sin argumentos (esencial para Jackson)
    public AuthRequest() {
    }

    // Constructor con todos los argumentos (opcional, pero buena práctica)
    public AuthRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // Getter para 'username'
    public String getUsername() {
        return username;
    }

    // Setter para 'username'
    public void setUsername(String username) {
        this.username = username;
    }

    // Getter para 'password'
    public String getPassword() {
        return password;
    }

    // Setter para 'password'
    public void setPassword(String password) {
        this.password = password;
    }
}