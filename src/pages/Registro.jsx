import { useState, useEffect } from 'react';
// 1. IMPORTAMOS useNavigate y Alert
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Card,
  Alert, // <--- Importado
} from 'react-bootstrap';
import { validarRUT, dominioPermitido, passwordOk, passwordsMatch } from '../utils/validators';
import { regions } from '../data/regions';

export default function Registro() {
  const [form, setForm] = useState({
    rut: '',
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    region: '',
    comuna: ''
  });
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);
  const [communes, setCommunes] = useState([]);
  
  // 2. ESTADO para mostrar el mensaje de éxito
  const [showSuccess, setShowSuccess] = useState(false);
  
  // 3. INICIALIZAMOS useNavigate
  const nav = useNavigate();

  const allowedDomains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com'];

  useEffect(() => {
    if (form.region) {
      const selectedRegion = regions.find(r => r.id === parseInt(form.region));
      setCommunes(selectedRegion?.communes || []);
      setForm(prev => ({ ...prev, comuna: '' }));
    }
  }, [form.region]);

  const validateForm = () => {
    // ... (Tu lógica de validación se mantiene igual)
    const newErrors = {};
    if (!validarRUT(form.rut)) { newErrors.rut = 'RUT inválido'; }
    if (!form.nombre.trim()) { newErrors.nombre = 'El nombre es requerido'; }
    if (!form.email) { newErrors.email = 'El email es requerido'; }
    else if (!dominioPermitido(form.email, allowedDomains)) { newErrors.email = 'Dominio de correo no permitido'; }
    if (!passwordOk(form.password)) { newErrors.password = 'La contraseña debe tener entre 4 y 10 caracteres'; }
    if (!passwordsMatch(form.password, form.confirmPassword)) { newErrors.confirmPassword = 'Las contraseñas no coinciden'; }
    if (!form.region) { newErrors.region = 'Selecciona una región'; }
    if (!form.comuna) { newErrors.comuna = 'Selecciona una comuna'; }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValidated(true);
    
    if (validateForm()) {
      // 4. LÓGICA DE REDIRECCIÓN
      // Quitamos el alert() y mostramos nuestro componente Alert
      setShowSuccess(true);
      
      // Aquí iría la lógica para enviar los datos al servidor
      
      // Esperamos 3 segundos y redirigimos a /login
      setTimeout(() => {
        nav('/login');
      }, 3000); // 3 segundos
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col md={8} lg={7}>
          <Card className="border-0 shadow"> 
            <Card.Body className="p-4">
              <h1 className="text-center text-danger fw-bold mb-4">Registro</h1>

              {/* 5. MENSAJE DE ÉXITO */}
              {showSuccess && (
                <Alert variant="success">
                  ¡Registro exitoso! Redirigiendo a Login...
                </Alert>
              )}

              <Form noValidate validated={validated} onSubmit={onSubmit}>
                {/* ... (Todos tus Form.Group se mantienen igual) ... */}
                
                <Form.Group className="mb-3">
                  <Form.Label>RUT</Form.Label>
                  <Form.Control
                    required
                    value={form.rut}
                    onChange={e => setForm({ ...form, rut: e.target.value })}
                    isInvalid={!!errors.rut}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.rut || 'Ingresa un RUT válido'}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    required
                    value={form.nombre}
                    onChange={e => setForm({ ...form, nombre: e.target.value })}
                    isInvalid={!!errors.nombre}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nombre || 'Ingresa tu nombre'}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email || 'Ingresa un email válido'}
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    Dominios permitidos: {allowedDomains.join(', ')}
                  </Form.Text>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control
                        required
                        type="password"
                        value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })}
                        isInvalid={!!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password || 'La contraseña debe tener entre 4 y 10 caracteres'}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Confirmar Contraseña</Form.Label>
                      <Form.Control
                        required
                        type="password"
                        value={form.confirmPassword}
                        onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                        isInvalid={!!errors.confirmPassword}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword || 'Las contraseñas deben coincidir'}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Región</Form.Label>
                      <Form.Select
                        required
                        value={form.region}
                        onChange={e => setForm({ ...form, region: e.target.value })}
                        isInvalid={!!errors.region}
                      >
                        <option value="">Selecciona una región</option>
                        {regions.map(region => (
                          <option key={region.id} value={region.id}>
                            {region.name}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.region || 'Selecciona una región'}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Comuna</Form.Label>
                      <Form.Select
                        required
                        value={form.comuna}
                        onChange={e => setForm({ ...form, comuna: e.target.value })}
                        isInvalid={!!errors.comuna}
                        disabled={!form.region}
                      >
                        <option value="">Selecciona una comuna</option>
                        {communes.map(comuna => (
                          <option key={comuna} value={comuna}>
                            {comuna}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.comuna || 'Selecciona una comuna'}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>


                {/* 6. BOTÓN DESHABILITADO al enviar */}
                <Button 
                  type="submit" 
                  className="w-100"
                  disabled={showSuccess}
                >
                  {showSuccess ? "Registrando..." : "Crear cuenta"}
                </Button>
              </Form>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}