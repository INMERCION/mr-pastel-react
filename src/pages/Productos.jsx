// Productos.jsx - lista productos desde data/products; agrega al carrito via CartContext.
import products from '../data/products';
import ProductGrid from '../components/ProductGrid';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function Productos() {
  const { addItem } = useContext(CartContext);
  return (
    <>
      <h1 className="mb-3">Productos</h1>
      <ProductGrid productos={products} onAdd={addItem} />
    </>
  );
}
