import { createContext, useState, useMemo, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // 🛒 Recuperar carrito almacenado
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setItems(JSON.parse(stored));
  }, []);

  // 💾 Guardar en localStorage cada vez que cambie el carrito
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  // ➕ Agregar producto (suma cantidades si ya existe)
  const addItem = (producto, cantidad = 1) => {
    setItems((prev) => {
      const existente = prev.find((x) => x.id === producto.id);
      return existente
        ? prev.map((x) =>
            x.id === producto.id
              ? { ...x, cantidad: x.cantidad + cantidad }
              : x
          )
        : [...prev, { ...producto, cantidad }];
    });
  };

  // 🔁 Actualizar cantidad directamente (si no existe, lo agrega)
  const updateItemQuantity = (id, nuevaCantidad, producto = null) => {
    setItems((prev) => {
      const existente = prev.find((x) => x.id === id);

      // 🔹 Si no existe, lo agrega
      if (!existente && producto) {
        return [...prev, { ...producto, cantidad: Math.max(1, nuevaCantidad) }];
      }

      // 🔹 Si existe, actualiza cantidad
      return prev.map((x) =>
        x.id === id
          ? { ...x, cantidad: Math.max(1, nuevaCantidad) }
          : x
      );
    });
  };

  // ❌ Eliminar producto del carrito
  const removeItem = (id) =>
    setItems((prev) => prev.filter((x) => x.id !== id));

  // 🧹 Vaciar carrito completo
  const clear = () => setItems([]);

  // 💰 Calcular total
  const total = useMemo(
    () => items.reduce((acc, i) => acc + i.precio * i.cantidad, 0),
    [items]
  );

  // 🔢 Contar total de unidades
  const count = useMemo(
    () => items.reduce((acc, i) => acc + i.cantidad, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateItemQuantity,
        removeItem,
        clear,
        total,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
