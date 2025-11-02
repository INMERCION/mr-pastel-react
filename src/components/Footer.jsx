// Footer.jsx - versión completa con diseño final
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "../styles/Footer.css"; // <- agregaremos el CSS específico

export default function Footer() {
  return (
    <footer className="footer mt-5 pt-5 pb-3 text-light">
      <Container>
        <Row className="gy-4">
          {/* Columna 1: Información */}
          <Col md={4}>
            <h5 className="fw-bold mb-3 text-uppercase">Pastelería Mr. Pastel</h5>
            <p className="mb-1">Av. Dulce 123, Santiago, Chile</p>
            <p className="mb-1">Tel: +56 9 1234 5678</p>
            <p className="mb-0">Email: contacto@mrpastel.cl</p>
          </Col>

          {/* Columna 2: Navegación */}
          <Col md={4}>
            <h6 className="fw-bold mb-3 text-uppercase">Navegación</h6>
            <ul className="list-unstyled">
              <li><NavLink to="/" className="footer-link">Home</NavLink></li>
              <li><NavLink to="/productos" className="footer-link">Productos</NavLink></li>
              <li><NavLink to="/nosotros" className="footer-link">Nosotros</NavLink></li>
              <li><NavLink to="/blog" className="footer-link">Blogs</NavLink></li>
              <li><NavLink to="/contacto" className="footer-link">Contacto</NavLink></li>
            </ul>
          </Col>

          {/* Columna 3: Redes sociales */}
          <Col md={4}>
            <h6 className="fw-bold mb-3 text-uppercase">Síguenos</h6>
            <div className="d-flex gap-3 fs-4">
              <a href="#" className="footer-icon"><FaFacebook /></a>
              <a href="#" className="footer-icon"><FaInstagram /></a>
              <a href="#" className="footer-icon"><FaTwitter /></a>
              <a href="#" className="footer-icon"><FaYoutube /></a>
              <a href="#" className="footer-icon"><FaTiktok /></a>
            </div>
          </Col>
        </Row>

        <hr className="border-secondary my-4" />

        {/* Franja inferior */}
        <p className="text-center text-muted small mb-0">
          © {new Date().getFullYear()} Pastelería Mr. Pastel. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
}
