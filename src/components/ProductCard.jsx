// ProductCard.jsx - imagen clickeable para ir a detalle del producto
import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/productos.css";

export default function ProductCard({ producto, onAdd }) {
  const navigate = useNavigate();
  if (!producto) return null;

  // 🧭 Navegación al detalle del producto
  const irADetalle = () => navigate(`/producto/${producto.id}`);

  return (
    <Card className="h-100 shadow-sm border-0 product-card">
      {/* 🖼️ Imagen clickeable */}
      <div
        className="product-img-wrapper"
        onClick={irADetalle}
        style={{ cursor: "pointer" }}
      >
        <Card.Img
          variant="top"
          src={producto.imagen}
          alt={producto.nombre}
          className="product-img"
        />
      </div>

      {/* 📋 Cuerpo de la tarjeta */}
      <Card.Body className="d-flex flex-column justify-content-between text-center">
        {/* 🏷️ Nombre del producto */}
        <Card.Title
          className="fw-semibold mb-2 text-truncate"
          style={{ cursor: "default" }}
        >
          {producto.nombre}
        </Card.Title>

        {/* 💰 Precio y botón agregar */}
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <strong className="text-danger">
            ${producto.precio.toLocaleString("es-CL")}
          </strong>
          <Button
            variant="danger"
            size="sm"
            className="rounded-pill fw-semibold"
            onClick={(e) => {
              e.stopPropagation(); // 🚫 Evita que el clic redirija
              onAdd && onAdd(producto);
            }}
          >
            Agregar
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
