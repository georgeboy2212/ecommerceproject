package com.ecommerceapp.home.security.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerceapp.home.security.user.AppUser;

import java.util.Optional;

public interface UserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByUsername(String username);
}