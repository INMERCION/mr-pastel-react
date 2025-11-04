import { useContext } from 'react';
import { Table, Button, Form, InputGroup, Card, Image } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Carrito() {
  const { items, updateItemQuantity, removeItem, clear } =
    useContext(CartContext);
  const navigate = useNavigate();

  const total = items.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  const handleQuantityChange = (item, newQty) => {
    const quantity = Math.max(1, Math.min(99, Number(newQty) || 0));
    updateItemQuantity(item.id, quantity);
  };

  const handleDecrement = (item) => {
    if (item.cantidad > 1) {
      updateItemQuantity(item.id, item.cantidad - 1);
    } else {
      removeItem(item.id);
    }
  };

  const handleCheckout = () => {
    navigate("/");
  };

  if (!items.length) {
    return (
      <Card className="text-center p-5 shadow border-0">
        <Card.Body>
          <Image
            src="../images/duda.jpg"
            alt="Carrito vacío"
            fluid
            className="mb-4"
            style={{ maxWidth: "150px", height: "auto" }}
          />
          <Card.Title>Tu carrito está vacío</Card.Title>
          <Card.Text>
            ¿No sabes qué comprar? ¡Revisa nuestros productos destacados!
          </Card.Text>
          <Button variant="primary" onClick={() => navigate("/productos")}>
            Ver Productos
          </Button>
        </Card.Body>
      </Card>
    );
  }

  return (
    <div className="carrito-container">
      <h1 className="mb-4 text-center text-danger fw-bold">
        Carrito de Compras
      </h1>

      <Table responsive hover className="align-middle">
        <thead className="table-light">
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Subtotal</th>
            
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
                        marginRight: "1rem",
                        borderRadius: "4px",
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
                <InputGroup size="sm" className="flex-nowrap">
                  <Button
                    variant="outline-secondary"
                    onClick={() => handleDecrement(item)}
                  >
                    -
                  </Button>
                  <Form.Control
                    type="number"
                    min="1"
                    max="99"
                    value={item.cantidad}
                    onChange={(e) =>
                      handleQuantityChange(item, e.target.value)
                    }
                    style={{ width: "25px", textAlign: "center" }}
                    onFocus={(e) => e.target.blur()}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() =>
                      handleQuantityChange(item, item.cantidad + 1)
                    }
                  >
                    +
                  </Button>
                </InputGroup>
              </td>
              <td className="text-nowrap">
                ${item.precio.toLocaleString("es-CL")}
              </td>
              <td className="text-nowrap">
                ${(item.precio * item.cantidad).toLocaleString("es-CL")}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="text-end fw-bold">
              Total:
            </td>
            <td className="fw-bold text-nowrap">
              ${total.toLocaleString("es-CL")}
            </td>
          </tr>
        </tfoot>
      </Table>

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center mt-4 gap-2">
        <Button
          variant="outline-secondary"
          onClick={clear}
          disabled={!items.length}
        >
          Vaciar Carrito
        </Button>
        <div className="d-flex flex-column flex-md-row gap-2">
          <Button
            variant="outline-primary"
            onClick={() => navigate("/productos")}
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
