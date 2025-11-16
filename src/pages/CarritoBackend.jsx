// ============================================
// ARCHIVO: mr-pastel-react/src/pages/CarritoBackend.jsx
// Página de Carrito integrada con Backend
// ============================================

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContextBackend';
import { carritoAPI } from '../services/api';
import '../styles/Carrito.css';

const CarritoBackend = () => {
  const { token, user, isAuthenticated } = useContext(AuthContext);
  const [carrito, setCarrito] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchCarrito = async () => {
      try {
        const usuarioId = localStorage.getItem('usuarioId');
        const data = await carritoAPI.obtenerCarrito(usuarioId, token);
        setCarrito(data);
      } catch (error) {
        console.error('Error al obtener carrito:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarrito();
  }, [token, isAuthenticated]);

  const handleActualizarCantidad = async (itemId, nuevaCantidad) => {
    try {
      const usuarioId = localStorage.getItem('usuarioId');
      const data = await carritoAPI.actualizarCantidad(usuarioId, itemId, nuevaCantidad, token);
      setCarrito(data);
    } catch (error) {
      alert('Error al actualizar cantidad');
    }
  };

  const handleEliminarItem = async (itemId) => {
    if (window.confirm('¿Eliminar este producto del carrito?')) {
      try {
        const usuarioId = localStorage.getItem('usuarioId');
        const data = await carritoAPI.eliminarItem(usuarioId, itemId, token);
        setCarrito(data);
      } catch (error) {
        alert('Error al eliminar producto');
      }
    }
  };

  const handleVaciarCarrito = async () => {
    if (window.confirm('¿Vaciar el carrito completamente?')) {
      try {
        const usuarioId = localStorage.getItem('usuarioId');
        await carritoAPI.vaciarCarrito(usuarioId, token);
        setCarrito({ items: [], total: 0 });
      } catch (error) {
        alert('Error al vaciar carrito');
      }
    }
  };

  if (!isAuthenticated) {
    return <div className="message">Debes iniciar sesión para ver tu carrito</div>;
  }

  if (loading) {
    return <div className="loading">Cargando carrito...</div>;
  }

  if (!carrito || carrito.items.length === 0) {
    return <div className="empty-cart">Tu carrito está vacío</div>;
  }

  return (
    <div className="carrito-container">
      <h2>Mi Carrito</h2>
      <div className="carrito-items">
        {carrito.items.map((item) => (
          <div key={item.id} className="carrito-item">
            <img src={item.producto.imagen} alt={item.producto.nombre} />
            <div className="item-details">
              <h3>{item.producto.nombre}</h3>
              <p>Precio: ${item.producto.precio}</p>
            </div>
            <div className="item-cantidad">
              <button onClick={() => handleActualizarCantidad(item.id, item.cantidad - 1)}>
                -
              </button>
              <input 
                type="number" 
                value={item.cantidad}
                onChange={(e) => handleActualizarCantidad(item.id, parseInt(e.target.value))}
                min="1"
              />
              <button onClick={() => handleActualizarCantidad(item.id, item.cantidad + 1)}>
                +
              </button>
            </div>
            <div className="item-subtotal">
              <p>Subtotal: ${item.subtotal}</p>
            </div>
            <button 
              className="btn-eliminar"
              onClick={() => handleEliminarItem(item.id)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <div className="carrito-resumen">
        <h3>Total: ${carrito.total}</h3>
        <button className="btn-checkout">Proceder al Pago</button>
        <button className="btn-vaciar" onClick={handleVaciarCarrito}>
          Vaciar Carrito
        </button>
      </div>
    </div>
  );
};

export default CarritoBackend;
