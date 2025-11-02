// ProductoDetalle.jsx - Detalle de producto con control de cantidad dinámico
import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Button, Image } from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import products from "../data/products";
import "../styles/detalle.css";

export default function ProductoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();


  const { items, updateItemQuantity } = useContext(CartContext);
  const producto = products.find((p) => String(p.id) === String(id));

  const [cantidad, setCantidad] = useState(1);

  //Si el producto ya está en el carrito, reflejar su cantidad actual
  useEffect(() => {
    const existente = items.find((item) => item.id === producto?.id);
    if (existente) setCantidad(existente.cantidad);
  }, [items, producto]);

  if (!producto)
    return (
      <div className="text-center mt-5">
        <h3 className="text-danger">Producto no encontrado</h3>
        <Button variant="secondary" onClick={() => navigate("/productos")}>
          Volver al catálogo
        </Button>
      </div>
    );

  // Incrementar o decrementar cantidad
  const aumentar = () => {
    const nuevaCantidad = cantidad + 1;
    setCantidad(nuevaCantidad);
    updateItemQuantity(producto.id, nuevaCantidad, producto);
  };

  const disminuir = () => {
    if (cantidad > 1) {
      const nuevaCantidad = cantidad - 1;
      setCantidad(nuevaCantidad);
      updateItemQuantity(producto.id, nuevaCantidad, producto);
    }
  };

  return (
    <div className="detalle-page container py-5">
      <Row className="g-4 align-items-center">
        <Col md={6}>
          <Image
            src={producto.imagen}
            alt={producto.nombre}
            fluid
            className="rounded-3 shadow-sm detalle-imagen-fija"
          />
        </Col>

        <Col md={6}>
          <h1 className="fw-bold text-danger mb-3">{producto.nombre}</h1>
          <p className="text-muted mb-4">{producto.descripcion}</p>

          <h3 className="mb-3 fw-semibold">
            ${producto.precio.toLocaleString("es-CL")}
          </h3>

          {/* Control de cantidad */}
          <div className="d-flex align-items-center gap-3 mb-4">
            <Button
              variant="outline-danger"
              className="rounded-circle"
              onClick={disminuir}
            >
              –
            </Button>
            <span className="fs-4 fw-semibold">{cantidad}</span>
            <Button
              variant="outline-danger"
              className="rounded-circle"
              onClick={aumentar}
            >
              +
            </Button>
          </div>

          <p className="text-muted">
            La cantidad se actualiza automáticamente en tu carrito.
          </p>

          <Button
            variant="secondary"
            className="rounded-pill"
            onClick={() => navigate("/productos")}
          >
            ← Seguir comprando
          </Button>
        </Col>
      </Row>
    </div>
  );
}
