import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import "uikit/dist/css/uikit.min.css";
import "./Product.css";

const AdminPage = () => {
  const [products, setProducts] = useState([]);

  // Función para obtener los productos de la API
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Error: No estás autenticado.");
        return;
      }
      const response = await axios.get("http://localhost:8080/api/productos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setMessage("Error al cargar los productos.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Error: No estás autenticado.");
        return;
      }
      await axios.delete(`http://localhost:8080/api/productos/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Filtra el producto eliminado para actualizar la lista en la UI
      setProducts(products.filter((p) => p.id_producto !== productId));
      setMessage("Producto eliminado exitosamente.");
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      setMessage("Error al eliminar el producto.");
    }
  };

  return (
    <div>
      <div>
        <h2 className="inter uk-text-center uk-margin-small-top uk-margin-medium-top">
          Administrar Productos
        </h2>
      </div>

      <div className="uk-margin-left">
        <Link
          to="/create" // Esta es la ruta a tu componente Create_Product
          className="uk-button uk-button-primary uk-margin-bottom inter"
        ><span uk-icon="icon: plus"></span>
          Crear Nuevo Producto
        </Link>
      </div>
<div class="uk-overflow-auto">
      <table className="uk-table uk-table-divider uk-table-striped uk-table-hover uk-table-middle uk-text-center inter">
        <thead>
          <tr>
            <th className="uk-text-center">ID</th>
            <th className="uk-text-center">Imagen</th>
            <th className="uk-text-center">Nombre</th>
            <th className="uk-text-center">Precio</th>
            <th className="uk-text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id_producto}>
              <td>{product.id_producto}</td>
              <td><img src={product.imagen_producto} alt={product.nombre_producto} className="uk-preserve-width uk-border-rounded" style={{ maxHeight: "100px" }} /></td>
              <td>{product.nombre_producto}</td>
              <td>${product.precio_producto.toFixed(2)}</td>
              <td>
                <div className="uk-button-group">
                  <Link
                    to={`/edit/${product.id_producto}`}
                    className="uk-button uk-button-default uk-button-small uk-border-rounded uk-margin-small-right uk-text-capitalize inter"
                  >
                    <span uk-icon="icon: pencil"></span>
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id_producto)}
                    className="uk-button uk-button-danger uk-button-small uk-border-rounded uk-text-capitalize inter"
                  ><span uk-icon="icon: trash"></span> Eliminar
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default AdminPage;
