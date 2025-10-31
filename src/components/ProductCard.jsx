// ProductCard.jsx
import React from "react";
import { Card, Button } from "react-bootstrap";

export default function ProductCard({ producto, onAdd }) {
  if (!producto) return null;

  return (
    <Card className="h-100 shadow-sm border-0 d-flex flex-column justify-content-between">
      {/* Imagen */}
      <div
        style={{
          height: "200px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        <Card.Img
          variant="top"
          src={producto.imagen}
          alt={producto.nombre}
          style={{
            maxHeight: "200px",
            width: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Cuerpo */}
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
