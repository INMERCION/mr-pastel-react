import React, { createContext, useContext, useState } from 'react';
// Importamos los datos mock que nos diste
import initialProducts from '../data/products.js'; 

// 1. Crear el Contexto
const ProductsContext = createContext();

// 2. Crear el Proveedor (Provider)
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);

  // Función para agregar un nuevo producto (simulado)
  const addProduct = (newProduct) => {
    // Simulamos un ID nuevo (en una BD real, esto sería autoincremental)
    const productWithId = { 
      ...newProduct, 
      id: products.length + 1 
    };
    setProducts([...products, productWithId]);
  };

  // Función para actualizar un producto (simulado)
  const updateProduct = (updatedProduct) => {
    setProducts(products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    ));
  };

  // Función para eliminar un producto (simulado)
  const deleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  // Valor que compartirás a los componentes hijos
  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

// 3. Hook personalizado para consumir el contexto fácilmente
export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts debe ser usado dentro de un ProductsProvider');
  }
  return context;
};