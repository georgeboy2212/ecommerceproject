package com.ecommerceapp.home.productos.service;

import com.ecommerceapp.home.productos.model.Producto;
import com.ecommerceapp.home.productos.repository.ProductRepository;

import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ProductoService {

    private final ProductRepository productRepository;

    
    public ProductoService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Producto> getAllProductos() {
        return productRepository.findAll();
    }

    public Producto getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public Producto createProduct(Producto product) {
        return productRepository.save(product);
    }

    public Producto updateProduct(Long id, Producto productoDetails) {
        Producto productoExistente = productRepository.findById(id).orElse(null);
        if (productoExistente != null) {
            // Actualizar los campos del producto existente con los detalles del producto recibido
            productoExistente.setNombre_producto(productoDetails.getNombre_producto());
            productoExistente.setDescripcion_producto(productoDetails.getDescripcion_producto());
            productoExistente.setPrecio_producto(productoDetails.getPrecio_producto());
            productoExistente.setImagen_producto(productoDetails.getImagen_producto());
            productoExistente.setCaracterísticas_producto(productoDetails.getCaracterísticas_producto());
            return productRepository.save(productoExistente);
        } else {
            return null;
    }

    }

    public void deleteProduct(Long id) {
        Producto product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("El Producto no fue encontrado con este id " + id));
        productRepository.delete(product);
    }

    
}
