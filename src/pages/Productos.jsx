// Productos.jsx - Catálogo con búsqueda, filtro por categoría y paginación local
import React, { useContext, useState, useMemo } from "react";
import products from "../data/products";
import ProductGrid from "../components/ProductGrid";
import { CartContext } from "../context/CartContext";
import "../styles/productos.css";

export default function Productos() {
  const { addItem } = useContext(CartContext);

  // 🔍 Estados de búsqueda, filtro y paginación
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [pagina, setPagina] = useState(1);

  // 🔧 Categorías únicas
  const categorias = useMemo(() => {
    const unicas = ["Todas", ...new Set(products.map((p) => p.categoria))];
    return unicas;
  }, []);

  // 🧠 Filtrar productos por nombre y categoría
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

  // 📄 Paginación
  const productosPorPagina = 8;
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const inicio = (pagina - 1) * productosPorPagina;
  const fin = inicio + productosPorPagina;
  const productosPaginados = productosFiltrados.slice(inicio, fin);

  // 🔁 Reinicia a la primera página cuando cambian los filtros
  React.useEffect(() => {
    setPagina(1);
  }, [busqueda, categoria]);

  return (
    <div className="catalogo-page container py-5">
      {/* 🧁 Título */}
      <h2 className="text-center mb-4 fw-bold text-danger">
        Catálogo de Productos
      </h2>

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
      {productosPaginados.length > 0 ? (
        <ProductGrid productos={productosPaginados} onAdd={addItem} />
      ) : (
        <p className="text-center text-muted mt-4">
          No se encontraron productos con esos filtros.
        </p>
      )}

      {/* 📑 Controles de paginación */}
      {totalPaginas > 1 && (
        <div className="d-flex justify-content-center mt-4 gap-2 flex-wrap">
          {Array.from({ length: totalPaginas }).map((_, i) => (
            <button
              key={i}
              className={`btn btn-sm ${
                pagina === i + 1 ? "btn-danger" : "btn-outline-danger"
              }`}
              onClick={() => setPagina(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
