// src/hooks/useProducts.js
import { useState, useEffect } from 'react';
// Asegúrate de que la ruta a tu archivo de productos sea correcta
import defaultProducts from '../data/products'; 

const LOCAL_STORAGE_KEY = 'products';

export function useProducts() {
  const [products, setProducts] = useState([]);

  // 1. Cargar productos desde localStorage al montar el componente
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      // Si no hay nada en localStorage, usa la data inicial (seed)
      setProducts(defaultProducts);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultProducts));
    }
  }, []); // El array vacío [] asegura que esto solo se ejecute una vez

  // 2. Función para guardar productos (usada por las otras funciones)
  const saveProducts = (newProducts) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newProducts));
    setProducts(newProducts);
  };

  // 3. Función para ELIMINAR un producto
  const deleteProduct = (id) => {
    const newProducts = products.filter(p => p.id !== id);
    saveProducts(newProducts);
  };

  // 4. Función para AÑADIR un producto
  const addProduct = (product) => {
    // Genera un ID simple (en una app real, usa UUID o un ID de BD)
    const newProduct = { ...product, id: Date.now().toString() };
    const newProducts = [...products, newProduct];
    saveProducts(newProducts);
  };

  // 5. Función para ACTUALIZAR un producto
  const updateProduct = (id, updatedProduct) => {
    const newProducts = products.map(p =>
      p.id === id ? { ...p, ...updatedProduct, id: p.id } : p
    );
    saveProducts(newProducts);
  };

  // 6. Función para OBTENER un producto por ID
  const getProduct = (id) => {
    return products.find(p => p.id === id);
  };

  // 7. Expone la lista de productos y las funciones
  return { products, getProduct, addProduct, updateProduct, deleteProduct };
}