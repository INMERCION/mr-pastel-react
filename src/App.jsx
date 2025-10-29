// App.jsx - router principal y layout común (Navbar + Footer).
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Productos from './pages/Productos';
import ProductoDetalle from './pages/ProductoDetalle';
import Carrito from './pages/Carrito';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Contacto from './pages/Contacto';
import Blog from './pages/Blog';
import Nosotros from './pages/Nosotros';

// Admin (placeholders)
import AdminHome from './pages/admin/AdminHome';
import ProductosAdmin from './pages/admin/ProductosAdmin';
import UsuariosAdmin from './pages/admin/UsuariosAdmin';

// Importa el protector
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container as="main" className="py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/nosotros" element={<Nosotros />} />

          {/* 🔒 Solo accesible si el usuario es admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/productos"
            element={
              <ProtectedRoute adminOnly>
                <ProductosAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/usuarios"
            element={
              <ProtectedRoute adminOnly>
                <UsuariosAdmin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  );
}
