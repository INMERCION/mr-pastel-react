import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const OrderContext = createContext();
export const useOrders = () => useContext(OrderContext);

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export function OrderProvider({ children }) {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar pedidos del usuario desde API
  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      setOrders([]);
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/pedidos/usuario/${user.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) throw new Error("Error cargando pedidos");
      
      const data = await response.json();
      
      // Mapear pedidos del backend al formato del frontend
      const mappedOrders = data.map(pedido => ({
        id: pedido.id,
        userId: pedido.usuarioId,
        fecha: pedido.fechaCreacion,
        estado: pedido.estado,
        total: pedido.total,
        productos: pedido.productos.map(item => ({
          id: item.productoId,
          nombre: item.nombre,
          cantidad: item.cantidad,
          precio: item.precio,
          imagen: item.imagen
        }))
      }));
      
      setOrders(mappedOrders);
    } catch (err) {
      console.error("Error cargando pedidos:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (items, total) => {
    if (!user) {
      throw new Error('Debes iniciar sesión para crear un pedido');
    }

    if (!items || items.length === 0) {
      throw new Error('El carrito está vacío');
    }

    try {
      const token = localStorage.getItem("token");
      const orderData = {
        usuarioId: user.id,
        total: total,
        productos: items.map(item => ({
          productoId: item.id,
          cantidad: item.cantidad || item.qty,
          precio: item.precio
        }))
      };

      const response = await fetch(`${API_URL}/api/pedidos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) throw new Error("Error creando pedido");

      const newOrder = await response.json();
      setOrders(prevOrders => [newOrder, ...prevOrders]);
      return newOrder;
    } catch (err) {
      console.error("Error creando pedido:", err);
      throw err;
    }
  };

  const getUserOrders = () => {
    return orders;
  };

  const cancelOrder = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/pedidos/${orderId}/cancelar`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error("Error cancelando pedido");

      await fetchOrders();
    } catch (err) {
      console.error("Error cancelando pedido:", err);
      throw err;
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/pedidos/${orderId}/estado`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ estado: newStatus })
      });

      if (!response.ok) throw new Error("Error actualizando estado");

      await fetchOrders();
    } catch (err) {
      console.error("Error actualizando estado:", err);
      throw err;
    }
  };

  const value = {
    orders: getUserOrders(),
    loading,
    createOrder,
    cancelOrder,
    updateOrderStatus,
    refreshOrders: fetchOrders
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}
