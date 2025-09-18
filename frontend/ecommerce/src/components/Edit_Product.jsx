import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import myImage from "../assets/png.jpg";
import "uikit/dist/css/uikit.min.css";
import "./Product.css";

const Edit_Product = () => {
  const { id_producto } = useParams(); // Obtiene el ID del producto de la URL
  const navigate = useNavigate();

  const imagenFondo = {
        backgroundImage: `url(${myImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height:"100vh",
        width: "1800px",
      };

  // Estados para los datos del producto
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");

  // Usamos useEffect para cargar los datos del producto al montar el componente
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setMessage("Error: No estás autenticado.");
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/api/productos/${id_producto}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error al obtener el producto:", error.response || error);
        setMessage("Error al cargar los datos del producto.");
      }
    };
    fetchProduct();
  }, [id_producto]); // La dependencia id_producto asegura que se ejecute si la URL cambia

  // Manejador del cambio en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const updatedProduct = {
        ...product,
        precio_producto: parseFloat(product.precio_producto), // Asegura que el precio sea un número
      };

      await axios.put(
        `http://localhost:8080/api/productos/${id_producto}`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("¡Producto actualizado exitosamente!");
      setTimeout(() => navigate('/'), 2000); // Redirige al inicio
    } catch (error) {
      console.error("Error al actualizar el producto:", error.response || error);
      setMessage("Error al actualizar el producto. Revisa la consola.");
    }
  };
  
  // Renderizado condicional
  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <div style={imagenFondo}>
      
      {message && <div className="uk-alert-primary" uk-alert><p>{message}</p></div>}
      <form className="uk-card uk-card-default uk-card-body uk-border-rounded uk-position-center uk-margin-medium-top merriweather" onSubmit={handleSubmit}>
        <div>
            <h2 className="uk-text-center merriweather">Editar Producto</h2>
        </div>
        
        {/* Usamos el estado 'product' en los inputs */}
        <div>
          <input
            className="uk-input uk-margin"
            type="text"
            name="nombre_producto"
            value={product.nombre_producto || ""}
            placeholder="Nombre del Producto"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <textarea
            className="uk-textarea uk-margin"
            name="descripcion_producto"
            value={product.descripcion_producto || ""}
            placeholder="Descripción del Producto"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            className="uk-input uk-margin"
            type="number"
            name="precio_producto"
            value={product.precio_producto || ""}
            placeholder="Precio"
            onChange={handleInputChange}
            required
            step="0.01"
          />
        </div>
        <div>
          <input
            className="uk-input uk-margin"
            type="text"
            name="imagen_producto"
            value={product.imagen_producto || ""}
            placeholder="URL de la Imagen"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <textarea
            className="uk-textarea"
            name="caracteristicas_producto"
            value={product.caracteristicas_producto || ""}
            placeholder="Características del Producto"
            onChange={handleInputChange}
            required
          />
        </div>
        <button className="uk-button uk-button-primary uk-margin" type="submit">Actualizar Producto</button>
      </form>
    </div>
  );
};

export default Edit_Product;