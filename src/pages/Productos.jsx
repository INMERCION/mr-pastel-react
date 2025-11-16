// Productos.jsx - Catálogo con búsqueda, filtro por categoría y paginación local
import React, { useContext, useState, useMemo, useEffect } from "react";
import ProductGrid from "../components/ProductGrid";
import { CartContext } from "../context/CartContext";
import "../styles/productos.css";

export default function Productos() {
  const { addItem } = useContext(CartContext);

  // 🔍 Estados de búsqueda, filtro y paginación
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [pagina, setPagina] = useState(1);

  // ✅ Estados para datos remotos
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // URL de la API backend local
  const API_URL = `${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/api/productos`;

  // 🔧 Categorías únicas (derivadas de los productos cargados)
  const categorias = useMemo(() => {
    const unicas = [
      "Todas",
      ...new Set((products || []).map((p) => p.categoria || "Otros")),
    ];
    return unicas;
  }, [products]);

  // 🧠 Filtrar productos por nombre y categoría
  const productosFiltrados = useMemo(() => {
    return (products || []).filter((p) => {
      const coincideCategoria =
        categoria === "Todas" || p.categoria === categoria;
      const nombre = (p.nombre || "").toString();
      const coincideBusqueda = nombre.toLowerCase().includes(busqueda.toLowerCase());
      return coincideCategoria && coincideBusqueda;
    });
  }, [busqueda, categoria, products]);

  // 📄 Paginación
  const productosPorPagina = 8;
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const inicio = (pagina - 1) * productosPorPagina;
  const fin = inicio + productosPorPagina;
  const productosPaginados = productosFiltrados.slice(inicio, fin);

  // 🔁 Reinicia a la primera página cuando cambian los filtros
  useEffect(() => {
    setPagina(1);
  }, [busqueda, categoria]);

  // 🛰️ Fetch: obtener productos desde la API remota al montar el componente
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    console.log('🚀 Llamando a API:', API_URL); // DEBUG

    fetch(API_URL)
      .then((res) => {
        console.log('📡 Respuesta recibida:', res.status, res.statusText); // DEBUG
        if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
        return res.json();
      })
      .then((data) => {
        if (!mounted) return;

        console.log('📦 Datos recibidos del backend:', data); // DEBUG

        // Normalizar la respuesta: ORDS/REST puede devolver distintos shapes.
        let items = [];
        if (Array.isArray(data)) items = data;
        else if (Array.isArray(data.items)) items = data.items;
        else if (Array.isArray(data.rows)) items = data.rows;
        else {
          // buscar primer array en el objeto
          const found = Object.values(data).find((v) => Array.isArray(v));
          items = found || [];
        }

        console.log('📋 Items extraídos:', items.length, 'productos'); // DEBUG

        // Mapear campos a la estructura que usa la app
        const normalized = items.map((it, idx) => ({
          id: it.id ?? it.ID ?? it.producto_id ?? it.PRODUCTO_ID ?? idx,
          nombre:
            it.nombre ?? it.NOMBRE ?? it.nombre_producto ?? it.name ?? "",
          categoria: it.categoria ?? it.CATEGORIA ?? it.categoria_producto ?? "Otros",
          precio: Number(it.precio ?? it.PRECIO ?? it.price ?? 0),
          stock: Number(it.stock ?? it.STOCK ?? it.existencia ?? 0),
          imagen:
            it.imagen ?? it.IMAGEN ?? it.imagen_url ?? it.image ?? "/images/default.jpg",
        }));

        console.log('✅ Productos normalizados:', normalized); // DEBUG
        setProducts(normalized);
      })
      .catch((err) => {
        if (!mounted) return;
        console.error('❌ Error al cargar productos:', err); // DEBUG
        setError(err.message || "Error al cargar productos");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [API_URL]);

  // 🔄 Mostrar estado de carga
  if (loading) {
    return (
      <div className="catalogo-page container py-5 text-center">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Cargando productos...</span>
        </div>
        <p className="mt-3 text-muted">Cargando catálogo desde la API...</p>
      </div>
    );
  }

  // ❌ Mostrar error si lo hay
  if (error) {
    return (
      <div className="catalogo-page container py-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">❌ Error al cargar productos</h4>
          <p>{error}</p>
          <hr />
          <p className="mb-0">
            Verifica que el backend esté ejecutándose en{' '}
            <code>{API_URL}</code>
          </p>
          <button 
            className="btn btn-danger mt-3" 
            onClick={() => window.location.reload()}
          >
            🔄 Reintentar
          </button>
        </div>
      </div>
    );
  }

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
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : productosPaginados.length > 0 ? (
        <ProductGrid productos={productosPaginados} onAdd={addItem} />
      ) : (
        <div className="alert alert-info text-center mt-4">
          <h5>📦 No se encontraron productos</h5>
          <p className="mb-0">
            {products.length === 0 
              ? 'No hay productos disponibles en la base de datos.'
              : 'No se encontraron productos con esos filtros.'}
          </p>
        </div>
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
