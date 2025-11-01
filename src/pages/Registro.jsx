import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
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

  // Dominios de correo permitidos
  const allowedDomains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com'];

  // Actualizar comunas cuando cambia la región
  useEffect(() => {
    if (form.region) {
      const selectedRegion = regions.find(r => r.id === parseInt(form.region));
      setCommunes(selectedRegion?.communes || []);
      setForm(prev => ({ ...prev, comuna: '' }));
    }
  }, [form.region]);

  const validateForm = () => {
    const newErrors = {};
    
    // Validar RUT
    if (!validarRUT(form.rut)) {
      newErrors.rut = 'RUT inválido';
    }

    // Validar nombre
    if (!form.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    // Validar email y dominio
    if (!form.email) {
      newErrors.email = 'El email es requerido';
    } else if (!dominioPermitido(form.email, allowedDomains)) {
      newErrors.email = 'Dominio de correo no permitido';
    }

    // Validar contraseña
    if (!passwordOk(form.password)) {
      newErrors.password = 'La contraseña debe tener entre 4 y 10 caracteres';
    }

    // Validar confirmación de contraseña
    if (!passwordsMatch(form.password, form.confirmPassword)) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    // Validar región
    if (!form.region) {
      newErrors.region = 'Selecciona una región';
    }

    // Validar comuna
    if (!form.comuna) {
      newErrors.comuna = 'Selecciona una comuna';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValidated(true);
    
    if (validateForm()) {
      alert('Registro exitoso ✅');
      // Aquí iría la lógica para enviar los datos al servidor
    }
  };

  return (
    <>
      <h1 className="mb-3">Registro</h1>
      <Form noValidate validated={validated} onSubmit={onSubmit}>
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

        <Button type="submit">Crear cuenta</Button>
      </Form>
    </>
  );
}
