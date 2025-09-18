import React from "react";
import './Product.css'; 

const Product = ({ product, onProductClick }) => {
  const {
    id_producto,
    nombre_producto,
    descripcion_producto,
    precio_producto,
    imagen_producto,
  } = product;

  return (
    <div className="uk-card uk-card-default">
      <div className="uk-card-media-top">
        <img
          src={imagen_producto}
          alt="{nombre_producto}"
          className="uk-cover"
          uk-img="true"
          style={{ height: '200px', overflow: 'hidden' }}
        />
      </div>
      <div className="uk-card-body uk-flex uk-flex-column uk-flex-between">
        <h3 className="uk-card-title">{nombre_producto}</h3>
        <p>{descripcion_producto}</p>
        <p>${precio_producto.toFixed(2)}</p>
        <button className="uk-button uk-button-secondary uk-width-auto" onClick={() => onProductClick(id_producto)}>
          Ver Detalle
        </button>
      </div>
    </div>
  );
};

export default Product;
