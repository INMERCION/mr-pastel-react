// ProductGrid.jsx - grilla responsiva; compone múltiples ProductCard.
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';

export default function ProductGrid({ productos, onAdd }) {
  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-3">
      {productos.map((p) => (
        <Col key={p.id}>
          <ProductCard producto={p} onAdd={onAdd} />
        </Col>
      ))}
    </Row>
  );
}
