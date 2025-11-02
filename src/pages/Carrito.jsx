import { useContext } from 'react';
import { Table, Button, Form, InputGroup, Card } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { BiTrash } from "react-icons/bi";

export default function Carrito() {
  const { items, updateItemQuantity, removeItem, clear } = useContext(CartContext);
  const navigate = useNavigate();

  // Calcular el total
  const total = items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

  // Manejar cambios en la cantidad
  const handleQuantityChange = (item, newQty) => {
    const quantity = Math.max(1, Math.min(99, Number(newQty) || 0));
    updateItemQuantity(item.id, quantity);
  };

  // Continuar con la compra
  const handleCheckout = () => {
    navigate('/checkout'); // Asumiendo que tendrás una ruta de checkout
  };

  if (!items.length) {
    return (
      <Card className="text-center p-5">
        <Card.Body>
          <Card.Title>Tu carrito está vacío</Card.Title>
          <Card.Text>
            ¿No sabes qué comprar? ¡Revisa nuestros productos destacados!
          </Card.Text>
          <Button variant="primary" onClick={() => navigate('/productos')}>
            Ver Productos
          </Button>
        </Card.Body>
      </Card>
    );
  }

  return (
    <div className="carrito-container">
      <h1 className="mb-4">Carrito de Compras</h1>
      
      <Table responsive hover className="align-middle">
        <thead className="table-light">
          <tr>
            <th>Producto</th>
            <th style={{ width: "200px" }}>Cantidad</th>
            <th style={{ width: "160px" }}>Precio</th>
            <th style={{ width: "160px" }}>Subtotal</th>
            <th style={{ width: "100px" }}></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <div className="d-flex align-items-center">
                  {item.imagen && (
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        marginRight: "1rem"
                      }}
                    />
                  )}
                  <div>
                    <div className="fw-bold">{item.nombre}</div>
                    {item.descripcion && (
                      <small className="text-muted">{item.descripcion}</small>
                    )}
                  </div>
                </div>
              </td>
              <td>
                <InputGroup size="sm">
                  <Button
                    variant="outline-secondary"
                    onClick={() => handleQuantityChange(item, item.cantidad - 1)}
                  >
                    -
                  </Button>
                  <Form.Control
                    type="number"
                    min="1"
                    max="99"
                    value={item.cantidad}
                    onChange={(e) => handleQuantityChange(item, e.target.value)}
                    style={{ maxWidth: "60px", textAlign: "center" }}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => handleQuantityChange(item, item.cantidad + 1)}
                  >
                    +
                  </Button>
                </InputGroup>
              </td>
              <td>${item.precio.toLocaleString('es-CL')}</td>
              <td>${(item.precio * item.cantidad).toLocaleString('es-CL')}</td>
              <td>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                >
                  <BiTrash/>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="text-end fw-bold">Total:</td>
            <td className="fw-bold">${total.toLocaleString('es-CL')}</td>
            <td></td>
          </tr>
        </tfoot>
      </Table>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <Button
          variant="outline-secondary"
          onClick={clear}
          disabled={!items.length}
        >
          Vaciar Carrito
        </Button>
        <div>
          <Button
            variant="outline-primary"
            className="me-2"
            onClick={() => navigate('/productos')}
          >
            Seguir Comprando
          </Button>
          <Button
            variant="primary"
            onClick={handleCheckout}
            disabled={!items.length}
          >
            Continuar Compra
          </Button>
        </div>
      </div>
    </div>
  );
}
