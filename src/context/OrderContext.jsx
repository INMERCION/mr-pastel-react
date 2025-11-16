import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const OrderContext = createContext();
export const useOrders = () => useContext(OrderContext);

export function OrderProvider({ children }) {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  // Cargar pedidos del usuario desde localStorage
  useEffect(() => {
    if (user) {
      try {
        const storedOrders = localStorage.getItem(`orders_${user.id}`);
        if (storedOrders) {
          setOrders(JSON.parse(storedOrders));
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error('Error cargando pedidos:', err);
        setOrders([]);
      }
    } else {
      setOrders([]);
    }
  }, [user]);

  // Guardar pedidos en localStorage cuando cambien
  useEffect(() => {
    if (user && orders.length > 0) {
      try {
        localStorage.setItem(`orders_${user.id}`, JSON.stringify(orders));
      } catch (err) {
        console.error('Error guardando pedidos:', err);
      }
    }
  }, [orders, user]);

  // Crear un nuevo pedido
  const createOrder = (items, total) => {
    if (!user) {
      throw new Error('Debes iniciar sesión para crear un pedido');
    }

    if (!items || items.length === 0) {
      throw new Error('El carrito está vacío');
    }

    const newOrder = {
      id: Date.now(), // ID único basado en timestamp
      userId: user.id,
      fecha: new Date().toISOString(),
      estado: 'procesando',
      total: total,
      productos: items.map(item => ({
        id: item.id,
        nombre: item.nombre,
        cantidad: item.cantidad,
        precio: item.precio,
        imagen: item.imagen
      }))
    };

    setOrders(prevOrders => [newOrder, ...prevOrders]);
    return newOrder;
  };

  // Obtener pedidos del usuario actual
  const getUserOrders = () => {
    if (!user) return [];
    return orders.filter(order => order.userId === user.id);
  };

  // Cancelar un pedido (solo si está en procesando)
  const cancelOrder = (orderId) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId && order.estado === 'procesando'
          ? { ...order, estado: 'cancelado' }
          : order
      )
    );
  };

  // Actualizar estado de un pedido (para admin)
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, estado: newStatus } : order
      )
    );
  };

  const value = {
    orders: getUserOrders(),
    createOrder,
    cancelOrder,
    updateOrderStatus
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}
