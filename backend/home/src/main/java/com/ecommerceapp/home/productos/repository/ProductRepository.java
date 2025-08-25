package com.ecommerceapp.home.productos.repository;
import org.springframework.stereotype.Repository;

import com.ecommerceapp.home.productos.model.Producto;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface ProductRepository extends JpaRepository<Producto, Long> {
    // Aquí puedes agregar métodos personalizados si es necesario
    // Por ejemplo, buscar productos por nombre, categoría, etc.

}
