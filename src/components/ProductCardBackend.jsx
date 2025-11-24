// ============================================
// ARCHIVO: mr-pastel-react/src/components/ProductCardBackend.jsx
// Componente que consume API Backend
// ============================================

import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContextBackend';
import { carritoAPI } from '../services/api';
import '../styles/ProductCard.css';

const ProductCardBackend = ({ producto }) => {
  const { token, user } = useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);

  const handleAddToCart = async () => {
    if (!token) {
      alert('Debes iniciar sesión para agregar al carrito');
      return;
    }

    setLoading(true);
    try {
      const usuarioId = localStorage.getItem('usuarioId');
      await carritoAPI.agregarProducto(usuarioId, producto.id, 1, token);
      alert('Producto agregado al carrito');
    } catch (error) {
      alert('Error al agregar al carrito: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-card">
      <img src={producto.imagen} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <div className="product-info">
        <span className="category">{producto.categoria}</span>
        <span className="region">{producto.region}</span>
      </div>
      <div className="product-footer">
        <span className="price">${producto.precio}</span>
        <span className="stock">Stock: {producto.stock}</span>
      </div>
      <button 
        onClick={handleAddToCart} 
        disabled={loading || producto.stock === 0}
        className="btn-add-cart"
      >
        {loading ? 'Agregando...' : 'Agregar al Carrito'}
      </button>
    </div>
  );
};

export default ProductCardBackend;
