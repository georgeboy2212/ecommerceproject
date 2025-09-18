import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "uikit/dist/css/uikit.min.css";
import "./Product.css";
import myImage from "../assets/png.jpg";

const Delete_Product = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { id_producto } = useParams(); // Obtiene el ID del producto de los parámetros de la URL
  const imagenFondo = {
        backgroundImage: `url(${myImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height:"100vh",
        width: "1800px",
      };

  useEffect(() => {
    const handleDelete = async () => {
      setMessage("Eliminando producto...");

      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Error: No estás autenticado.");
        return;
      }

      try {
        await axios.delete(
          `http://localhost:8080/api/productos/${id_producto}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage(`¡Producto con ID ${id_producto} eliminado exitosamente!`);

        setTimeout(() => {
          navigate("/"); // Redirige a la página principal después de 2 segundos
        }, 2000);
      } catch (error) {
        console.error("Error al eliminar el producto:", error.response || error);
        setMessage(
          "Error al eliminar el producto. Revisa la consola para más detalles."
        );
      }
    };

    if (id_producto) {
      handleDelete();
    } else {
      setMessage("Error: No se proporcionó un ID de producto para eliminar.");
    }
  }, [id_producto, navigate]);

  return (
    <div className="uk-container uk-text-center uk-margin-large-top">
      <div className="uk-alert-primary" uk-alert>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Delete_Product;