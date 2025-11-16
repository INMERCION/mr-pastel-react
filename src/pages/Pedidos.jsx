import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Accordion } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useNavigate } from 'react-router-dom';
import { FaShoppingBag, FaClock, FaCheckCircle, FaTruck, FaTimesCircle } from 'react-icons/fa';

export default function Pedidos() {
  const { user } = useAuth();
  const { orders, cancelOrder } = useOrders();
  const navigate = useNavigate();
  
  // Mock de pedidos eliminado - ahora usamos los pedidos reales del contexto

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const getEstadoBadge = (estado) => {
    switch (estado) {
      case 'entregado':
        return <Badge bg="success"><FaCheckCircle /> Entregado</Badge>;
      case 'en_camino':
        return <Badge bg="info"><FaTruck /> En Camino</Badge>;
      case 'procesando':
        return <Badge bg="warning"><FaClock /> Procesando</Badge>;
      case 'cancelado':
        return <Badge bg="danger"><FaTimesCircle /> Cancelado</Badge>;
      default:
        return <Badge bg="secondary">Desconocido</Badge>;
    }
  };

  const formatFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleCancelOrder = (orderId) => {
    if (window.confirm('¿Estás seguro de que deseas cancelar este pedido?')) {
      cancelOrder(orderId);
    }
  };

  if (!user) return null;

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h2 className="text-danger fw-bold mb-4">
            <FaShoppingBag className="me-2" />
            Mis Pedidos
          </h2>

          {orders.length === 0 ? (
            <Card className="text-center p-5 shadow border-0">
              <Card.Body>
                <FaShoppingBag size={60} className="text-muted mb-3" />
                <Card.Title>No tienes pedidos aún</Card.Title>
                <Card.Text className="text-muted">
                  ¡Empieza a comprar nuestros deliciosos productos!
                </Card.Text>
                <Button variant="danger" onClick={() => navigate('/productos')}>
                  Ver Productos
                </Button>
              </Card.Body>
            </Card>
          ) : (
            <Accordion defaultActiveKey="0">
              {orders.map((pedido, index) => (
                <Accordion.Item eventKey={String(index)} key={pedido.id}>
                  <Accordion.Header>
                    <div className="d-flex justify-content-between w-100 align-items-center me-3">
                      <div>
                        <strong>Pedido #{pedido.id}</strong>
                        <div className="text-muted small">{formatFecha(pedido.fecha)}</div>
                      </div>
                      <div className="d-flex align-items-center gap-3">
                        {getEstadoBadge(pedido.estado)}
                        <strong className="text-danger">
                          ${pedido.total.toLocaleString('es-CL')}
                        </strong>
                      </div>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Table responsive hover>
                      <thead className="table-light">
                        <tr>
                          <th>Producto</th>
                          <th className="text-center">Cantidad</th>
                          <th className="text-end">Precio Unit.</th>
                          <th className="text-end">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pedido.productos.map((producto) => (
                          <tr key={producto.id}>
                            <td>{producto.nombre}</td>
                            <td className="text-center">{producto.cantidad}</td>
                            <td className="text-end">
                              ${producto.precio.toLocaleString('es-CL')}
                            </td>
                            <td className="text-end fw-bold">
                              ${(producto.precio * producto.cantidad).toLocaleString('es-CL')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="table-light">
                          <td colSpan="3" className="text-end fw-bold">Total:</td>
                          <td className="text-end fw-bold text-danger">
                            ${pedido.total.toLocaleString('es-CL')}
                          </td>
                        </tr>
                      </tfoot>
                    </Table>

                    {pedido.estado === 'procesando' && (
                      <div className="text-end">
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleCancelOrder(pedido.id)}
                        >
                          Cancelar Pedido
                        </Button>
                      </div>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          )}
        </Col>
      </Row>
    </Container>
  );
}
