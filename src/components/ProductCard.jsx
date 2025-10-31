// ProductCard.jsx - tarjeta individual con centrado y efecto hover
import React from "react";
import { Card, Button } from "react-bootstrap";
import "../styles/productos.css"; // 👈 reutilizamos aquí la clase de hover global

export default function ProductCard({ producto, onAdd }) {
  if (!producto) return null;

  return (
    <Card className="h-100 shadow-sm border-0 product-card">
      {/* Imagen centrada */}
      <div className="product-img-wrapper">
        <Card.Img
          variant="top"
          src={producto.imagen}
          alt={producto.nombre}
          className="product-img"
        />
      </div>

      {/*Cuerpo */}
      <Card.Body className="d-flex flex-column justify-content-between text-center">
        <div>
          <Card.Title className="fw-semibold mb-2 text-truncate">
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
            onClick={() => onAdd(producto)}
          >
            Agregar
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
