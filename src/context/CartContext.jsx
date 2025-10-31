import { createContext, useState, useMemo, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // Recuperar carrito almacenado
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setItems(JSON.parse(stored));
  }, []);

  // Guardar cada vez que cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (p, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((x) => x.id === p.id);
      return existing
        ? prev.map((x) =>
            x.id === p.id ? { ...x, qty: x.qty + qty } : x
          )
        : [...prev, { ...p, qty }];
    });
  };

  const removeItem = (id) =>
    setItems((prev) => prev.filter((x) => x.id !== id));

  const clear = () => setItems([]);

  const total = useMemo(
    () => items.reduce((a, i) => a + i.precio * i.qty, 0),
    [items]
  );

  const count = useMemo(
    () => items.reduce((a, i) => a + i.qty, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clear, total, count }}
    >
      {children}
    </CartContext.Provider>
  );
}
