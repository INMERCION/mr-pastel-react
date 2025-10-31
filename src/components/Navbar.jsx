import { NavLink } from "react-router-dom";
import { Navbar as BSNavbar, Nav, Container, Badge } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { items } = useContext(CartContext);
  const totalItems = items?.reduce((acc, it) => acc + it.qty, 0) || 0;

  return (
    <BSNavbar bg="white" expand="lg" className="shadow-sm py-3">
      <Container>
        {/* Logo */}
        <BSNavbar.Brand as={NavLink} to="/" className="d-flex align-items-center fw-bold text-danger">
          <img
            src="/images/logo1_sf.png"
            alt="Mr. Pastel"
            height="40"
            className="me-2 rounded-circle border"
          />
          Mr. Pastel
        </BSNavbar.Brand>

        <BSNavbar.Toggle aria-controls="main-nav" />
        <BSNavbar.Collapse id="main-nav" className="justify-content-center">
          {/* Menú central */}
          <Nav className="gap-3">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/productos">
              Productos
            </Nav.Link>
            <Nav.Link as={NavLink} to="/nosotros">
              Nosotros
            </Nav.Link>
            <Nav.Link as={NavLink} to="/blog">
              Blogs
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contacto">
              Contacto
            </Nav.Link>
          </Nav>
        </BSNavbar.Collapse>

        {/* Icono carrito + login/registro */}
        <Nav className="align-items-center ms-auto">
          <Nav.Link as={NavLink} to="/carrito" className="position-relative me-3">
            <FaShoppingCart size={20} />
            {totalItems > 0 && (
              <Badge
                pill
                bg="danger"
                className="position-absolute top-0 start-100 translate-middle"
              >
                {totalItems}
              </Badge>
            )}
          </Nav.Link>
          <Nav.Link as={NavLink} to="/login">
            Login
          </Nav.Link>
          <Nav.Link as={NavLink} to="/registro">
            Registro
          </Nav.Link>
        </Nav>
      </Container>
    </BSNavbar>
  );
}
