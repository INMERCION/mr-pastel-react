// Home.jsx - portada con Hero, destacados y CTA a Productos.
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Row, Col,Carousel } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";
import { useProducts } from "../context/ProductsContext";
import "../styles/home.css";
import "../styles/productos.css";

export default function Home() {
  const navigate = useNavigate();
  const { addItem } = useContext(CartContext);
  const { products } = useProducts();
  const destacados = products.slice(0, 6);
const heroSlides = [
    {
      id: 1,
      title: "¡Celebramos 50 años de dulzura!",
      text: "Ganadores del Récord Guinness 1995 por la torta más grande del mundo.",
      image: "/images/1.jpg", // Fondo para el slide 1
      logo: "/images/logo_sf.png",
      logoAlt: "Mr. Pastel Chef",
      overlayColor: "rgba(255, 42, 0, 0.07)",
    },
    {
      id: 2,
      title: "Nuevas Recetas de Temporada",
      text: "Descubre nuestros sabores de otoño: Pastel de Calabaza y Tarta de Manzana Caramelizada.",
      image: "/images/2.jpeg", // Asume que tienes una imagen 2.jpg
      logo: "/images/logo_sf2.png",
      logoAlt: "Mr. Pastel Chef",
      overlayColor: "rgba(76, 0, 255, 0.3)", // Overlay oscuro
    },
    {
      id: 3,
      title: "Ofertas Especiales del Mes",
      text: "Hasta 25% de descuento en nuestra selección de postres individuales. ¡No te lo pierdas!",
      image: "/images/3.jpg", // Asume que tienes una imagen 3.jpg
      logo: "/images/logo_sf3.png",
      logoAlt: "Mr. Pastel Chef",
      overlayColor: "rgba(255, 0, 0, 0.15)", // Overlay anaranjado
    },
    {
      id: 4,
      title: "Personaliza tu Evento",
      text: "Encarga la torta perfecta para cumpleaños, bodas o cualquier celebración. Contáctanos.",
      image: "/images/4.jpg", // Asume que tienes una imagen 4.jpg
      logo: "/images/logo_sf4.png",
      logoAlt: "Mr. Pastel Chef",
      overlayColor: "rgba(0, 13, 255, 0.1)", // Overlay verdoso
    },
  ];

  return (
    <div className="home-page">
      {/* 🧁 HERO SECTION */}
      <section className="hero-section">
        <Carousel controls={true} indicators={true} interval={5000}>
          {heroSlides.map((slide) => (
            <Carousel.Item key={slide.id}>
              <div
                className="d-flex align-items-center text-light text-center text-md-start"
                style={{
                  backgroundImage: `url('${slide.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  minHeight: "60vh",
                  position: "relative",
                }}
              >
                <div
                  className="overlay"
                  style={{
                    backgroundColor: slide.overlayColor,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1,
                  }}
                ></div>

                <div className="container position-relative py-5" style={{ zIndex: 2 }}>
                  <Row className="align-items-center">
                    <Col md={7}>
                      {/* El texto del carrusel siempre debe estar en contraste */}
                      <h1 className="fw-bold mb-3" style={{ color: "#ff6b6b" }}>
                        {slide.title}
                      </h1>

                      <p className="fs-5 mb-4 text-light">
                        {slide.text}
                      </p>
                      <Button
                        as={Link}
                        to="/productos"
                        variant="danger"
                        size="lg"
                        className="rounded-pill fw-semibold"
                      >
                        Ver Productos
                      </Button>
                    </Col>

                    <Col md={5} className="text-center">
                      <img
                        src={slide.logo}
                        alt={slide.logoAlt}
                        className="img-fluid"
                        style={{ maxHeight: "250px" }}
                      />
                    </Col>
                  </Row>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      {/* 🍰 PRODUCTOS DESTACADOS */}
      <section className="productos-destacados py-5 bg-light">
        <div className="container">
          <h2 className="text-center text-danger mb-4 fw-bold">
            Productos Destacados
          </h2>

          <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-center">
            {destacados.map((producto) => (
              <Col
                key={producto.id}
                className="d-flex justify-content-center align-items-stretch"
              >
                <div style={{ width: "100%", maxWidth: "260px" }}>
                  <ProductCard producto={producto} onAdd={addItem} />
                </div>
              </Col>
            ))}
          </Row>

          <div className="text-center mt-4">
            <Button
              variant="danger"
              size="lg"
              className="rounded-pill fw-semibold"
              onClick={() => navigate("/productos")}
            >
              Ver Más Productos
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}