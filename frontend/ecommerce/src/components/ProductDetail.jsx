import React, { useState, useEffect } from "react";
import axios from "axios";
import spinners from "../assets/svg.gif";

const ProductDetail = ({ id_producto, onBack }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const [selectedProductId, setSelectedProductId] = useState(null); // 👈 Nuevo estado para el ID

  useEffect(() => {
    // Simula una pequeña demora para la carga
    setTimeout(() => {
      axios
        .get(`http://localhost:8080/api/productos/${id_producto}`)
        .then((response) => {
          setProduct(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
          setError("Ops, Error al cargar los detalles del producto.");
          setLoading(false);
        });
    }, 500);
  }, [id_producto]);

  if (loading) {
      return (
        <div className="uk-width-1-1 uk-position-center">
          <img src={spinners} alt="Cargando..." />
        </div>
      );
    }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Producto no encontrado.</div>;
  }

  return (
    <div className="uk-container uk-container-large uk-margin-large-top">
      <button className="uk-button uk-button-default uk-margin-small-bottom" onClick={onBack}>
        ← Volver a la lista
      </button>
      <div className="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin" uk-grid="true">
        <div className="uk-card-media-left uk-cover-container">
          <img src={product.imagen_producto} alt={product.nombre_producto} uk-cover="true" />
          <canvas width="600" height="400"></canvas>
        </div>
        <div>
          <div className="uk-card-body">
            <h2 className="uk-card-title">{product.nombre_producto}</h2>
            <p className="uk-text-large uk-text-bold uk-text-primary">${product.precio_producto.toFixed(2)}</p>
            <p>{product.descripcion_producto}</p>
            <button className="uk-button uk-button-secondary">
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;