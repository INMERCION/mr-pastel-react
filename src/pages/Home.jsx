// Home.jsx - portada con Hero, destacados y CTA a Productos.
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";
import "../styles/home.css";
import "../styles/productos.css";

export default function Home() {
  const navigate = useNavigate();
  const { addItem } = useContext(CartContext);
  const destacados = products.slice(0, 6);

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
          <Row className="align-items-center">
            <Col md={7}>
              <h1 className="fw-bold mb-3" style={{ color: "#ff6b6b" }}>
                ¡Celebramos 50 años de dulzura!
              </h1>

              <p className="fs-5 mb-4 text-light">
                Ganadores del Récord Guinness 1995 por la torta más grande del
                mundo.
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

            {/* ✅ AQUÍ ESTÁ EL CAMBIO. Se quitaron 'd-none' y 'd-md-block' */}
            <Col md={5} className="text-center">
              <img
                src="/images/logo1_sf.png"
                alt="Mr. Pastel Chef"
                className="img-fluid"
                style={{ maxHeight: "250px" }}
              />
            </Col>
          </Row>
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