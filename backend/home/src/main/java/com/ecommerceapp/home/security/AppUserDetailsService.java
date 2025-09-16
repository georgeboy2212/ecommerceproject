package com.ecommerceapp.home.security;

import com.ecommerceapp.home.security.user.AppUser;
import com.ecommerceapp.home.security.user.repository.UserRepository;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // Importar @Transactional
import org.springframework.security.core.authority.SimpleGrantedAuthority; // Importar

import java.util.ArrayList;
import java.util.Arrays; // Importar
import java.util.stream.Collectors; // Importar

@Service
public class AppUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public AppUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true) // Añadir esta anotación
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario No Encontrado " + username));

        // Convertir la cadena de roles (ej: "USER,ADMIN") en una lista de autoridades
        var authorities = Arrays.stream(appUser.getRoles().split(","))
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toList());

        return new User(appUser.getUsername(), appUser.getPassword(), authorities);
    }
}