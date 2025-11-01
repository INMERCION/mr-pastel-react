import { createContext, useState, useMemo, useEffect } from "react";

export const CartContext = createContext();

// 🛍️ Validación de producto
const isValidProduct = (product) => {
  return (
    product &&
    typeof product === "object" &&
    typeof product.id === "number" &&
    typeof product.nombre === "string" &&
    typeof product.precio === "number" &&
    product.precio >= 0
  );
};

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🛒 Recuperar carrito almacenado (con manejo de errores)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cart");
      if (stored) {
        const parsed = JSON.parse(stored);
        // Validar que sea un array y que cada item sea válido
        if (Array.isArray(parsed) && parsed.every(isValidProduct)) {
          setItems(parsed);
        } else {
          console.warn("Carrito almacenado inválido, inicializando vacío");
          localStorage.removeItem("cart");
        }
      }
    } catch (err) {
      console.error("Error recuperando carrito:", err);
      localStorage.removeItem("cart");
    } finally {
      setLoading(false);
    }
  }, []);

  // 💾 Guardar en localStorage (con manejo de errores)
  useEffect(() => {
    if (!loading) { // No guardar durante la carga inicial
      try {
        localStorage.setItem("cart", JSON.stringify(items));
      } catch (err) {
        console.error("Error guardando carrito:", err);
      }
    }
  }, [items, loading]);

  // ➕ Agregar producto (con validaciones)
  const addItem = (producto, cantidad = 1) => {
    if (!isValidProduct(producto)) {
      console.error("Producto inválido:", producto);
      return false;
    }

    // Validar cantidad
    const validCantidad = Math.max(1, Math.floor(Number(cantidad) || 1));

    setItems((prev) => {
      const existente = prev.find((x) => x.id === producto.id);
      return existente
        ? prev.map((x) =>
            x.id === producto.id
              ? { ...x, cantidad: x.cantidad + validCantidad }
              : x
          )
        : [...prev, { ...producto, cantidad: validCantidad }];
    });
    return true;
  };

  // 🔁 Actualizar cantidad (con validaciones)
  const updateItemQuantity = (id, nuevaCantidad, producto = null) => {
    if (producto && !isValidProduct(producto)) {
      console.error("Producto inválido:", producto);
      return false;
    }

    // Validar cantidad y ID
    const validCantidad = Math.max(0, Math.floor(Number(nuevaCantidad) || 0));
    if (typeof id !== "number" || id <= 0) {
      console.error("ID inválido:", id);
      return false;
    }

    setItems((prev) => {
      // Si la cantidad es 0, eliminar el item
      if (validCantidad === 0) {
        return prev.filter(x => x.id !== id);
      }

      const existente = prev.find((x) => x.id === id);
      if (!existente && producto) {
        return [...prev, { ...producto, cantidad: validCantidad }];
      }

      return prev.map((x) =>
        x.id === id ? { ...x, cantidad: validCantidad } : x
      );
    });
    return true;
  };

  // ❌ Eliminar producto
  const removeItem = (id) => {
    if (typeof id !== "number" || id <= 0) {
      console.error("ID inválido:", id);
      return false;
    }
    setItems((prev) => prev.filter((x) => x.id !== id));
    return true;
  };

  // 🧹 Vaciar carrito
  const clear = () => {
    setItems([]);
    return true;
  };

  // 💰 Calcular total (memorizado)
  const total = useMemo(
    () => items.reduce((acc, i) => acc + (i.precio * i.cantidad), 0),
    [items]
  );

  // 🔢 Contar unidades (memorizado)
  const count = useMemo(
    () => items.reduce((acc, i) => acc + i.cantidad, 0),
    [items]
  );

  // 📊 Subtotal por producto (nuevo)
  const getItemSubtotal = useMemo(
    () => (id) => {
      const item = items.find(i => i.id === id);
      return item ? item.precio * item.cantidad : 0;
    },
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        addItem,
        updateItemQuantity,
        removeItem,
        clear,
        total,
        count,
        getItemSubtotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
