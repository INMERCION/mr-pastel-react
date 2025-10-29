// ProductCard.jsx - tarjeta individual de producto; llama onAdd(producto).
import { Card, Button } from 'react-bootstrap';

export default function ProductCard({ producto, onAdd }) {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} />
      <Card.Body>
        <Card.Title className="mb-2">{producto.nombre}</Card.Title>
        <Card.Text className="small text-muted">{producto.descripcion}</Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <strong>${producto.precio.toLocaleString('es-CL')}</strong>
          <Button onClick={() => onAdd(producto)}>Agregar</Button>
        </div>
      </Card.Body>
    </Card>
  );
}
