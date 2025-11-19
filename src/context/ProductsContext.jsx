import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductsContext = createContext();

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar productos al montar
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/productos`);
      if (!response.ok) throw new Error("Error cargando productos");
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error("Error cargando productos:", err);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (newProduct) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/productos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newProduct)
      });

      if (!response.ok) throw new Error("Error al crear producto");

      await fetchProducts();
      return true;
    } catch (err) {
      console.error("Error creando producto:", err);
      return false;
    }
  };

  const updateProduct = async (updatedProduct) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/productos/${updatedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedProduct)
      });

      if (!response.ok) throw new Error("Error al actualizar producto");

      await fetchProducts();
      return true;
    } catch (err) {
      console.error("Error actualizando producto:", err);
      return false;
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/productos/${productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error("Error al eliminar producto");

      await fetchProducts();
      return true;
    } catch (err) {
      console.error("Error eliminando producto:", err);
      return false;
    }
  };

  const value = {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    refreshProducts: fetchProducts
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts debe ser usado dentro de un ProductsProvider');
  }
  return context;
};