// ProductCard.jsx - tarjeta individual de producto; usa Bootstrap y onAdd(producto)
import React from "react";
import { Card, Button } from "react-bootstrap";

export default function ProductCard({ producto, onAdd }) {
  // Si no hay datos válidos, evita render vacío o errores
  if (!producto) return null;

  return (
    <Card className="h-100 shadow-sm border-0">
      {/* 🖼️ Imagen del producto */}
      <Card.Img
        variant="top"
        src={producto.imagen}
        alt={producto.nombre}
        style={{
          height: "200px",
          objectFit: "cover",
          borderTopLeftRadius: "0.5rem",
          borderTopRightRadius: "0.5rem",
        }}
      />

      {/* 📦 Cuerpo de la tarjeta */}
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title className="fw-semibold mb-2 text-truncate">
            {producto.nombre}
          </Card.Title>

          {producto.descripcion && (
            <Card.Text className="small text-muted mb-3">
              {producto.descripcion}
            </Card.Text>
          )}
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
