// ProductGrid.jsx - grilla responsiva de productos con manejo de vacíos
import React from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";

export default function ProductGrid({ productos = [], onAdd }) {
  // Si no hay productos, mostrar mensaje amigable
  if (!productos || productos.length === 0) {
    return (
      <p className="text-center text-muted my-4">
        No hay productos disponibles en este momento.
      </p>
    );
  }

  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-center">
      {productos.map((p) => (
        <Col key={p.id} className="d-flex">
          <ProductCard producto={p} onAdd={onAdd} />
        </Col>
      ))}
    </Row>
  );
}
