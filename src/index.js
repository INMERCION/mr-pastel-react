import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap global
import './styles/estilos.css';                 // Estilos propios
import App from './App';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
// 1. IMPORTAR EL NUEVO PROVIDER
import { ProductsProvider } from './context/ProductsContext';
import { OrderProvider } from './context/OrderContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      {/* 2. ENVOLVER CON PRODUCTS PROVIDER */}
      <ProductsProvider>
        <OrderProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </OrderProvider>
      </ProductsProvider>
    </AuthProvider>
  </React.StrictMode>
);