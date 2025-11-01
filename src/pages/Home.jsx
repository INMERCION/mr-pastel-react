// Home.jsx - portada con Hero, destacados y CTA a Productos.
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import "../styles/home.css";
import "../styles/productos.css"; // 👈 Importamos para aplicar mismo centrado y hover

export default function Home() {
  const navigate = useNavigate();
  const destacados = products.slice(0, 6); // 4–6 productos destacados

  return (
    <div className="home-page">

      {/* 🧁 HERO SECTION */}
      <section
        className="hero-section d-flex align-items-center text-light text-center text-md-start"
        style={{
          backgroundImage: "url('/images/2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "80vh",
          position: "relative",
        }}
      >
        <div
          className="overlay"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.45)",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        ></div>

        <div className="container position-relative">
          <div className="col-12 col-md-6">
            <h1 className="fw-bold mb-3" style={{ color: "#ff6b6b" }}>
              ¡Celebramos 50 años de dulzura!
            </h1>
            <p className="fs-5 mb-4 text-light">
              Ganadores del Récord Guinness 1995 por la torta más grande del mundo.
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
          </div>
        </div>
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
                {/* 🔹 Wrapper para centrar tarjetas más pequeñas */}
                <div style={{ width: "100%", maxWidth: "260px" }}>
                  <ProductCard producto={producto} />
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
