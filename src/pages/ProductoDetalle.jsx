// ProductoDetalle.jsx - obtiene el :id de la URL y muestra un producto.
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { Row, Col, Button, Image } from 'react-bootstrap';
import products from '../data/products';
import { CartContext } from '../context/CartContext';

export default function ProductoDetalle() {
  const { id } = useParams();
  const { addItem } = useContext(CartContext);
  const producto = products.find(p => String(p.id) === String(id));

  if (!producto) return <p>Producto no encontrado.</p>;

  return (
    <Row className="g-4">
      <Col md={6}><Image src={producto.imagen} alt={producto.nombre} fluid /></Col>
      <Col md={6}>
        <h1>{producto.nombre}</h1>
        <p className="text-muted">{producto.descripcion}</p>
        <h3 className="mb-3">${producto.precio.toLocaleString('es-CL')}</h3>
        <Button onClick={() => addItem(producto)}>Agregar al carrito</Button>
      </Col>
    </Row>
  );
}
