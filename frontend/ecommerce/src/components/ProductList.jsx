import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "./Product.jsx";
import "./Product.css";
import ProductDetail from "./ProductDetail.jsx";
import spinners from "../assets/svg.gif";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      axios
        .get("http://localhost:8080/api/productos")
        .then((response) => {
          setProducts(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          setError("Ops, Error al cargar los productos..");
          setLoading(false);
        });
    }, 2000);
  }, []);

  const filteredProducts = products.filter((product) =>
    product.nombre_producto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Funciones para manejar la navegación
  const handleProductClick = (id) => {
    setSelectedProductId(id);
  };

  const handleBackToList = () => {
    setSelectedProductId(null);
  };

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

  // Renderizado condicional
  if (selectedProductId) {
    return (
      <ProductDetail
        id_producto={selectedProductId}
        onBack={handleBackToList}
      />
    );
  }

  return (
    <div className="uk-container uk-container-large uk-margin-large-top">
      {/* Search Input */}Ñ
      <div className="uk-margin-medium-bottom">
        <input
          className="uk-input uk-form-width-large"
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div>
        <h3>Smartphones</h3>
      </div>

      {/* Conditional Rendering for a Single Product or Multiple Products */}
      {filteredProducts.length === 1 ? (
        <div className="uk-flex uk-flex-center">
          <div className="uk-width-auto@m">
            <Product
              product={filteredProducts[0]}
              onProductClick={handleProductClick}
            />
          </div>
        </div>
      ) : (
        <div className="uk-flex uk-flex-center">
          <div
            className="uk-child-width-1-4@m uk-grid"
            uk-grid="true"
            uk-height-match="target: .uk-card"
          >
            {filteredProducts.map((product) => (
              <div key={product.id_producto}>
                <Product
                  product={product}
                  onProductClick={handleProductClick}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
