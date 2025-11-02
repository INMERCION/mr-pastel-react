import { useState, useEffect } from 'react';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Alert,
} from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Contacto() {
  const [msg, setMsg] = useState({ nombre: '', email: '', mensaje: '' });
  const [validated, setValidated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { user } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (user) {
      setMsg(prev => ({ ...prev, nombre: user.name, email: user.email }));
    }
  }, [user]);

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      console.log("Mensaje enviado:", msg);
      // Mostramos la alerta de éxito
      setShowSuccess(true);
      
     
      setTimeout(() => {
        nav('/'); 
      }, 2000); 
    }

    setValidated(true);
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col md={7} lg={6}>
          <Card>
            <Card.Body className="p-4">
              
              <h1 className="text-center text-danger fw-bold mb-4">Contacto</h1>

             
              {showSuccess && (
                <Alert variant="success">
                  ¡Mensaje enviado con éxito! Redirigiendo a Home...
                </Alert>
              )}

              <Form noValidate validated={validated} onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    required
                    value={msg.nombre}
                    onChange={e => setMsg({ ...msg, nombre: e.target.value })}
                    readOnly={!!user}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor, ingresa tu nombre.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    value={msg.email}
                    onChange={e => setMsg({ ...msg, email: e.target.value })}
                    readOnly={!!user}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor, ingresa un email válido.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mensaje</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    required
                    value={msg.mensaje}
                    onChange={e => setMsg({ ...msg, mensaje: e.target.value })}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor, escribe tu mensaje.
                  </Form.Control.Feedback>
                </Form.Group>
                
               
                <Button 
                  type="submit" 
                  className="w-100" 
                  disabled={showSuccess}
                >
                  {showSuccess ? "Enviando..." : "Enviar"}
                </Button>
              </Form>
              
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}