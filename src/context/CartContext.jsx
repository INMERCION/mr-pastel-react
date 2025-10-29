// CartContext.jsx - estado global del carrito y operaciones básicas.
import { createContext, useMemo, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // { id, nombre, precio, imagen, qty }

  const addItem = (p, qty = 1) => {
    setItems((prev) => {
      const i = prev.find((x) => x.id === p.id);
      return i
        ? prev.map((x) => x.id === p.id ? { ...x, qty: x.qty + qty } : x)
        : [...prev, { ...p, qty }];
    });
  };

  const removeItem = (id) => setItems((prev) => prev.filter((x) => x.id !== id));
  const clear = () => setItems([]);

  const total = useMemo(
    () => items.reduce((a, i) => a + i.precio * i.qty, 0),
    [items]
  );

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clear, total }}>
      {children}
    </CartContext.Provider>
  );
}
