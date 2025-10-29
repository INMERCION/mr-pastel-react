// Home.jsx - portada simple con CTA a Productos.
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function Home() {
  return (
    <section className="text-center">
      <h1 className="mb-3">Bienvenido a Mr. Pastel</h1>
      <p className="text-muted">Delicias artesanales para cada ocasión.</p>
      <Button as={Link} to="/productos" className="mt-3">Ver productos</Button>
    </section>
  );
}
