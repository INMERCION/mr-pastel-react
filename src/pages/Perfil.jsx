import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { validarRUT } from '../utils/validators';
import { FaUser, FaEnvelope, FaIdCard, FaLock } from 'react-icons/fa';

export default function Perfil() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rut: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);

  // Cargar datos del usuario al montar
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        rut: user.rut || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  }, [user]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    }

    if (!validarRUT(formData.rut)) {
      newErrors.rut = 'RUT inválido';
    }

    // Si quiere cambiar contraseña, validar
    if (formData.newPassword) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = 'Ingresa tu contraseña actual';
      }
      if (formData.newPassword.length < 4) {
        newErrors.newPassword = 'La nueva contraseña debe tener al menos 4 caracteres';
      }
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true);

    if (validateForm()) {
      const updatedData = {
        id: user.id,
        name: formData.name,
        email: formData.email,
        rut: formData.rut,
        role: user.role
      };

      // Si cambió la contraseña, incluirla
      if (formData.newPassword) {
        updatedData.password = formData.newPassword;
      }

      updateUser(updatedData);
      
      setShowSuccess(true);
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow border-0">
            <Card.Body className="p-4">
              <h2 className="text-center text-danger fw-bold mb-4">
                <FaUser className="me-2" />
                Mi Perfil
              </h2>

              {showSuccess && (
                <Alert variant="success">
                  ¡Perfil actualizado exitosamente!
                </Alert>
              )}

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                {/* Información Personal */}
                <h5 className="mb-3 text-muted">Información Personal</h5>
                
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaUser className="me-2" />
                    Nombre Completo
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaIdCard className="me-2" />
                    RUT
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="rut"
                    value={formData.rut}
                    onChange={handleChange}
                    isInvalid={!!errors.rut}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.rut}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>
                    <FaEnvelope className="me-2" />
                    Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <hr />

                {/* Cambio de Contraseña */}
                <h5 className="mb-3 text-muted">
                  <FaLock className="me-2" />
                  Cambiar Contraseña (opcional)
                </h5>

                <Form.Group className="mb-3">
                  <Form.Label>Contraseña Actual</Form.Label>
                  <Form.Control
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    isInvalid={!!errors.currentPassword}
                    placeholder="Dejar en blanco si no deseas cambiar"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.currentPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Nueva Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    isInvalid={!!errors.newPassword}
                    placeholder="Mínimo 4 caracteres"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.newPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Confirmar Nueva Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    isInvalid={!!errors.confirmPassword}
                    placeholder="Repite la nueva contraseña"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="danger" type="submit" size="lg">
                    Guardar Cambios
                  </Button>
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => navigate('/')}
                  >
                    Volver al Inicio
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
