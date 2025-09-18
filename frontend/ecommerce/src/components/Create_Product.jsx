import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "uikit/dist/css/uikit.min.css";
import "./Product.css";
import myImage from "../assets/png.jpg";

const Create_Product = () => {
  // Estados para cada campo del formulario
  const [nombre_producto, setNombre] = useState("");
  const [descripcion_producto, setDescripcion] = useState("");
  const [precio_producto, setPrecio] = useState("");
  const [imagen_producto, setImagen] = useState("");
  const [características_producto, setCaracteristicas] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const imagenFondo = {
      backgroundImage: `url(${myImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height:"100vh",
      width: "1800px",
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Error: No estás autenticado.");
      return;
    }

    try {
      // Construir el objeto con los nombres de campo que el backend espera
      const newProduct = {
        nombre_producto,
        descripcion_producto,
        precio_producto: parseFloat(precio_producto),
        imagen_producto,
        características_producto,
      };

      const response = await axios.post(
        "http://localhost:8080/api/productos",
        newProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(
        `¡Producto ${response.data.nombre_producto} creado exitosamente!`
      );

      setTimeout(() => {
        navigate("/"); // Redirige a la página principal de administración
      }, 2000);

      // Limpiar todos los campos del formulario
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setImagen("");
      setCaracteristicas("");
    } catch (error) {
      console.error("Error al crear el producto:", error.response || error);
      setMessage(
        "Error al crear el producto. Revisa la consola para más detalles."
      );
    }
  };

  return (
    <div style={imagenFondo}>
        
      

      <div class="uk-alert-success" uk-alert>
        <a href class="uk-alert-close" uk-close></a>
        {message && <p>{message}</p>}
      </div>

      

      <form
        className="uk-card uk-card-default uk-card-body uk-border-rounded uk-position-center uk-margin-medium-top merriweather"
        onSubmit={handleSubmit}
      >
        <div>
            <h2 className="uk-text-center merriweather">Crear Producto</h2>
        </div>
        
        <div>
          <input
            className="uk-input uk-margin"
            type="text"
            value={nombre_producto}
            onChange={(e) => setNombre(e.target.value)}
            required
            placeholder="Nombre del Producto"
          />
        </div>
        <div>
          <textarea
            className="uk-textarea uk-margin"
            value={descripcion_producto}
            onChange={(e) => setDescripcion(e.target.value)}
            required
            placeholder="Descripción del Producto"
          />
        </div>
        <div>
          <input
            className="uk-input uk-margin"
            type="number"
            value={precio_producto}
            onChange={(e) => setPrecio(e.target.value)}
            required
            step="0.01"
            placeholder="Precio"
          />
        </div>
        <div>
          <input
            className="uk-input uk-margin"
            type="text"
            value={imagen_producto}
            onChange={(e) => setImagen(e.target.value)}
            required
            placeholder="URL de la Imagen"
          />
        </div>
        <div>
          <textarea
            className="uk-textarea"
            value={características_producto}
            onChange={(e) => setCaracteristicas(e.target.value)}
            required
            placeholder="Características del Producto"
          />
        </div>
        <button className="uk-button uk-button-primary uk-margin uk-align-center uk-border-rounded uk-margin merriweather" type="submit">
          Crear Producto
        </button>
      </form>
    </div>
  );
};

export default Create_Product;
