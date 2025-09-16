package com.ecommerceapp.home.productos.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;

//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ecommerceapp.home.productos.model.Producto;
import com.ecommerceapp.home.productos.service.ProductoService;



@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/productos")
public class ProductController {

    private final ProductoService productService;

    public ProductController(ProductoService productService) {
        this.productService = productService;
    }

    // Endpoint para obtener todos los productos
    @GetMapping
    public List<Producto> getAllProductos() {
        return productService.getAllProductos();
    }

    // Endpoint para obtener un producto por ID
    @GetMapping("/{id}")
    public ResponseEntity<Producto> getProductById(@PathVariable Long id) {
        Producto producto = productService.getProductById(id);

        if(producto != null){
            return ResponseEntity.ok(producto);
        } else {
            return ResponseEntity.notFound().build();
        }
    
    }

    // Endpoint para crear un nuevo producto
    @PostMapping
    public ResponseEntity<Producto> createProduct(@RequestBody Producto product) {
        Producto createdProduct = productService.createProduct(product);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);

    }

    // Endpoint para actualizar un producto existente
    @PutMapping("/{id}")
    public ResponseEntity<Producto> updateProduct(@PathVariable Long id, @RequestBody Producto product) {
            Producto updatedProduct = productService.updateProduct(id, product);
            if(updatedProduct != null){
                return ResponseEntity.ok(updatedProduct);
            } else {
                return ResponseEntity.notFound().build();
            }
        
    }

    // Endpoint para eliminar un producto
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
