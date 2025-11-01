// ProductoDetalle.jsx - muestra detalle individual, controla cantidad y agrega al carrito.
import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Button, Image, Form } from "react-bootstrap";
import products from "../data/products";
import { CartContext } from "../context/CartContext";
import "../styles/detalle.css";

export default function ProductoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useContext(CartContext);

  //Buscar producto por ID
  const producto = products.find((p) => String(p.id) === String(id));

  //Si no existe el producto → redirigir al catálogo
  useEffect(() => {
    if (!producto) {
      const timer = setTimeout(() => navigate("/productos"), 2000);
      return () => clearTimeout(timer);
    }
  }, [producto, navigate]);

  //Control de cantidad
  const [cantidad, setCantidad] = useState(1);
  const aumentar = () => setCantidad((prev) => prev + 1);
  const disminuir = () => setCantidad((prev) => (prev > 1 ? prev - 1 : 1));

  // 🛒 Manejar acción de agregar al carrito
  const handleAgregar = () => {
    addItem({ ...producto, cantidad });
  };

  // Si no hay producto válido
  if (!producto) {
    return (
      <div className="text-center py-5">
        <h4 className="text-muted">Producto no encontrado. Redirigiendo...</h4>
      </div>
    );
  }

  return (
    <div className="detalle-page container py-5">
      <Row className="g-5 align-items-center detalle-card p-3">
        {/* 🖼️ Imagen del producto */}
        <Col md={6} className="text-center">
          <Image
            src={producto.imagen}
            alt={producto.nombre}
            fluid
            className="rounded shadow-sm"
            style={{
              maxHeight: "400px",
              objectFit: "contain",
            }}
          />
        </Col>

        {/* 📋 Información del producto */}
        <Col md={6} className="detalle-info">
          <h2 className="mb-3">{producto.nombre}</h2>

          {producto.descripcion ? (
            <p className="text-muted mb-4">{producto.descripcion}</p>
          ) : (
            <p className="text-muted mb-4">
              Producto artesanal elaborado con los mejores ingredientes.
            </p>
          )}

          <h3 className="text-danger mb-4">
            ${producto.precio.toLocaleString("es-CL")}
          </h3>

          {/* 🔢 Selector de cantidad */}
          <div className="d-flex align-items-center mb-4">
            <Button
              variant="outline-danger"
              size="sm"
              onClick={disminuir}
              className="fw-bold"
            >
              −
            </Button>
            <Form.Control
              type="number"
              value={cantidad}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 1;
                setCantidad(val > 0 ? val : 1);
              }}
              className="mx-2 text-center"
              style={{ width: "70px" }}
            />
            <Button
              variant="outline-danger"
              size="sm"
              onClick={aumentar}
              className="fw-bold"
            >
              +
            </Button>
          </div>

          {/* 🛒 Botón agregar */}
          <Button
            variant="danger"
            size="lg"
            className="rounded-pill fw-semibold"
            onClick={handleAgregar}
          >
            Agregar al carrito
          </Button>
        </Col>
      </Row>
    </div>
  );
}
