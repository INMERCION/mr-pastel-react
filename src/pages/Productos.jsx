// Productos.jsx - Catálogo completo con filtros y búsqueda
import React, { useContext, useState, useMemo } from "react";
import products from "../data/products";
import ProductGrid from "../components/ProductGrid";
import { CartContext } from "../context/CartContext";
import "../styles/productos.css";

export default function Productos() {
  const { addItem } = useContext(CartContext);

  // 🔍 Estados locales de filtro y búsqueda
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todas");

  // 🔧 Obtener categorías únicas del catálogo
  const categorias = useMemo(() => {
    const unicas = ["Todas", ...new Set(products.map((p) => p.categoria))];
    return unicas;
  }, []);

  // 🧠 Filtrar productos según búsqueda y categoría
  const productosFiltrados = useMemo(() => {
    return products.filter((p) => {
      const coincideCategoria =
        categoria === "Todas" || p.categoria === categoria;
      const coincideBusqueda = p.nombre
        .toLowerCase()
        .includes(busqueda.toLowerCase());
      return coincideCategoria && coincideBusqueda;
    });
  }, [busqueda, categoria]);

  return (
    <div className="catalogo-page container py-5">
      {/* 🧁 Título */}
      <h2 className="text-center mb-4">Catálogo de Productos</h2>

      {/* 🔍 Filtros */}
      <div className="filtros">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* 🛒 Grilla de productos */}
      {productosFiltrados.length > 0 ? (
        <ProductGrid productos={productosFiltrados} onAdd={addItem} />
      ) : (
        <p className="text-center text-muted mt-4">
          No se encontraron productos con esos filtros.
        </p>
      )}
    </div>
  );
}
