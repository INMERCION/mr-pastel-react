// Carrito.jsx - tabla de items + total; usa CartContext.
import { useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';

export default function Carrito() {
  const { items, total, removeItem, clear } = useContext(CartContext);

  if (!items.length) return <p>Tu carrito está vacío.</p>;

  return (
    <>
      <h1 className="mb-3">Carrito</h1>
      <Table responsive hover>
        <thead>
          <tr>
            <th>Producto</th>
            <th width="120">Cantidad</th>
            <th width="160">Subtotal</th>
            <th width="80"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i.id}>
              <td>{i.nombre}</td>
              <td>{i.qty}</td>
              <td>${(i.precio * i.qty).toLocaleString('es-CL')}</td>
              <td>
                <Button variant="outline-danger" size="sm" onClick={() => removeItem(i.id)}>
                  Quitar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-between align-items-center">
        <strong>Total: ${total.toLocaleString('es-CL')}</strong>
        <div>
          <Button variant="secondary" className="me-2" onClick={clear}>Vaciar</Button>
          <Button>Comprar</Button>
        </div>
      </div>
    </>
  );
}
