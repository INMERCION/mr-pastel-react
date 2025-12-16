import { useContext, useState } from 'react';
import { Table, Button, Form, InputGroup, Card, Image, Modal, Alert } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

export default function Carrito() {
  const { items, updateItemQuantity, removeItem, clear } =
    useContext(CartContext);
  const { createOrder } = useOrders();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [showModal, setShowModal] = useState(false);
  const [orderCreated, setOrderCreated] = useState(null);
  const [error, setError] = useState('');

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
    // Verificar que el usuario esté logueado
    if (!user) {
      navigate('/login', { state: { from: '/carrito' } });
      return;
    }

    try {
      // Crear el pedido
      const newOrder =createOrder(items, total);
      setOrderCreated(newOrder);
      
      // Guardar información para el pago con Stripe
      const pedidoInfo = {
        pedidoId: newOrder.id,
        amount: total,
        description: `Pedido #${newOrder.id} - ${items.length} productos`,
        items: items
      };
      
      localStorage.setItem('pedidoPago', JSON.stringify(pedidoInfo));
      
      // Limpiar el carrito
      clear();
      
      // Redirigir a la página de pago con Stripe
      navigate('/pago');
    } catch (err) {
      setError(err.message || 'Error al crear el pedido');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/pedidos');
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
            className="d-flex align-items-center justify-content-center gap-2"
          >
            <span>💳</span>
            Proceder al Pago
          </Button>
        </div>
      </div>

      {/* Modal de confirmación */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="text-success">
            <FaCheckCircle className="me-2" />
            ¡Pedido Creado!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          {orderCreated && (
            <>
              <p className="mb-3">Tu pedido #{orderCreated.id} ha sido creado exitosamente.</p>
              <p className="text-muted mb-0">Total: <strong className="text-danger">${orderCreated.total.toLocaleString('es-CL')}</strong></p>
              <p className="text-muted">Estado: <strong>Procesando</strong></p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 justify-content-center">
          <Button variant="danger" onClick={handleCloseModal}>
            Ver Mis Pedidos
          </Button>
          <Button variant="outline-secondary" onClick={() => { setShowModal(false); navigate('/'); }}>
            Volver al Inicio
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Alerta de error */}
      {error && (
        <Alert variant="danger" className="mt-3" dismissible onClose={() => setError('')}>
          {error}
        </Alert>
      )}
    </div>
  );
}
