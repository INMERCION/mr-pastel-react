// ProductCard.jsx - tarjeta individual con centrado, hover y navegación por imagen/título
import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/productos.css";

export default function ProductCard({ producto, onAdd }) {
  const navigate = useNavigate();
  if (!producto) return null;

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

      {/* 📋 Cuerpo */}
      <Card.Body className="d-flex flex-column justify-content-between text-center">
        <div>
          {/* 🏷️ Nombre clickeable */}
          <Card.Title
            className="fw-semibold mb-2 text-truncate"
            style={{ cursor: "pointer" }}
            onClick={irADetalle}
          >
            {producto.nombre}
          </Card.Title>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-auto">
          <strong className="text-danger">
            ${producto.precio.toLocaleString("es-CL")}
          </strong>
          <Button
            variant="danger"
            size="sm"
            className="rounded-pill fw-semibold"
            onClick={() => onAdd && onAdd(producto)} // ✅ Manejo seguro
          >
            Agregar
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
