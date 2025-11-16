import React from "react";
import { NavLink } from "react-router-dom";
import {Navbar as BSNavbar,Nav,Container,NavDropdown,Badge,Button,} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
// 1. Importa useState
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { MusicContext } from "../context/MusicContext";
// En App.js o main.jsx
import "../index.css"; // O el nombre de tu archivo CSS

export default function Navbar() {
  const { count } = useContext(CartContext);
  const { user, signOut, isAdmin } = useAuth();
  const { musicActive, toggleMusic } = useContext(MusicContext);

  // 2. Añade el estado y las funciones de control
  const [expanded, setExpanded] = useState(false);
  const handleNavClose = () => setExpanded(false);
  const handleSignOut = () => {
    signOut();
    handleNavClose();
  };

  return (
    <BSNavbar
      bg="white"
      expand="lg"
      className="shadow-sm py-3 sticky-top"
      style={{ zIndex: 1030 }}
      // 3. Conecta el estado al Navbar
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container>
        {/* Logo */}
        <BSNavbar.Brand
          as={NavLink}
          to="/"
          className="d-flex align-items-center fw-bold text-danger"
          onClick={handleNavClose} // <-- También es buena idea añadirlo al logo
        >
          <img
            src="/images/logo_sf.png"
            alt="Mr. Pastel"
            height="40"
          />
          Mr. Pastel
        </BSNavbar.Brand>

        <BSNavbar.Collapse id="main-nav" className="justify-content-center">
          {/* Menú central */}
          <Nav className="gap-0 gap-lg-4 text-center">
            {/* 4. Añade onClick a todos los enlaces */}
            <Nav.Link as={NavLink} to="/" end onClick={handleNavClose}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/productos" onClick={handleNavClose}>
              Productos
            </Nav.Link>
            <Nav.Link as={NavLink} to="/nosotros" onClick={handleNavClose}>
              Nosotros
            </Nav.Link>
            <Nav.Link as={NavLink} to="/blog" onClick={handleNavClose}>
              Blogs
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contacto" onClick={handleNavClose}>
              Contacto
            </Nav.Link>
            {user ? (
              <NavDropdown title={user.name} align="end">
                {isAdmin && (
                  <NavDropdown.Item
                    as={NavLink}
                    to="/admin"
                    onClick={handleNavClose}
                  >
                    Panel Admin
                  </NavDropdown.Item>
                )}
                <NavDropdown.Item
                    as={NavLink}
                    to="/perfil" 
                    onClick={handleNavClose}
                  >
                    Mi Perfil
                  </NavDropdown.Item>
                <NavDropdown.Item
                    as={NavLink}
                    to="/pedidos" 
                    onClick={handleNavClose}
                  >
                    Mis Pedidos
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleSignOut}>
                    Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" onClick={handleNavClose}>
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/registro" onClick={handleNavClose}>
                  Registro
                </Nav.Link>
              </>
            )}
          </Nav>
        </BSNavbar.Collapse>

        {/* Icono carrito y botón música */}
        <Nav className="align-items-center ms-auto flex-row">
          <Button
            variant="outline-danger"
            size="sm"
            className="me-3 rounded-pill fw-semibold"
            onClick={toggleMusic}
          >
            {musicActive ? '🔊' : '🔇'}
          </Button>
          <Nav.Link
            as={NavLink}
            to="/carrito"
            className="position-relative me-3"
            // Opcional: Cierra el menú si hacen clic en el carrito
            onClick={handleNavClose} 
          >
            <FaShoppingCart size={20} />
            {count > 0 && (
              <Badge
                pill
                bg="danger"
                className="position-absolute top-0 start-100 translate-middle"
              >
                {count}
              </Badge>
            )}
          </Nav.Link>
        </Nav>

        {/* Toggle (ya no necesita onClick, lo maneja 'onToggle' del Navbar) */}
        <BSNavbar.Toggle aria-controls="main-nav" />
      </Container>
    </BSNavbar>
  );
}