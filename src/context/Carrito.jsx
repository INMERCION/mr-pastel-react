// src/pages/Carrito.jsx
import { useContext } from "react";
import { Table, Button } from "react-bootstrap";
import { CartContext } from "../context/CartContext";

export default function Carrito() {
  const { items, total, removeItem, clear } = useContext(CartContext);
  return (
    <>
      <h1>Carrito</h1>
      <Table responsive hover>
        <thead><tr><th>Producto</th><th>Cantidad</th><th>Precio</th><th></th></tr></thead>
        <tbody>
          {items.map(i => (
            <tr key={i.id}>
              <td>{i.nombre}</td>
              <td>{i.qty}</td>
              <td>${i.precio * i.qty}</td>
              <td><Button variant="outline-danger" onClick={() => removeItem(i.id)}>Quitar</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-between">
        <strong>Total: ${total}</strong>
        <div>
          <Button variant="secondary" className="me-2" onClick={clear}>Vaciar</Button>
          <Button>Comprar</Button>
        </div>
      </div>
    </>
  );
}
