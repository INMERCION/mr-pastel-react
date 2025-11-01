import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { ROLES } from '../../data/seedUsers'; // Importamos los roles

// Recibe:
// - initialData: Un usuario existente (para modo "Editar")
// - onSubmitForm: La función (addUser o updateUser) que se llamará
// - onCancel: Función para cerrar el formulario/modal
function UsuarioForm({ initialData, onSubmitForm, onCancel }) {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rut: '',
    password: '',
    role: ROLES.USER // Rol por defecto
  });

  // Si recibimos initialData (modo editar), llenamos el formulario
  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        name: initialData.name || '',
        email: initialData.email || '',
        rut: initialData.rut || '',
        role: initialData.role || ROLES.USER,
        password: '' // La contraseña NUNCA se pre-carga
      });
    } else {
      // Modo crear (resetea el form)
      setFormData({ name: '', email: '', rut: '', password: '', role: ROLES.USER });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let dataToSend = { ...formData };

    // Lógica de contraseña:
    // Si estamos editando y la contraseña está vacía,
    // no queremos sobreescribir la contraseña existente.
    if (initialData && dataToSend.password === '') {
      delete dataToSend.password;
    }
    
    // Si estamos creando, la contraseña es obligatoria
    if (!initialData && dataToSend.password === '') {
      alert("La contraseña es obligatoria para nuevos usuarios.");
      return;
    }

    onSubmitForm(dataToSend);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Nombre Completo</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="formRut">
            <Form.Label>RUT (ej: 12.345.678-9)</Form.Label>
            <Form.Control
              type="text"
              name="rut"
              value={formData.rut}
              onChange={handleChange}
              required
              disabled={!!initialData} // No se puede editar el RUT
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={!!initialData} // No se puede editar el email
            />
          </Form.Group>
        </Col>
        <Col md={6}>
           <Form.Group className="mb-3" controlId="formRole">
            <Form.Label>Rol</Form.Label>
            <Form.Select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value={ROLES.USER}>Usuario</option>
              <option value={ROLES.ADMIN}>Administrador</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder={initialData ? "(Dejar en blanco para no cambiar)" : "Contraseña obligatoria"}
        />
      </Form.Group>
      
      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="primary" type="submit">
          {initialData ? 'Actualizar Usuario' : 'Crear Usuario'}
        </Button>
      </div>
    </Form>
  );
}

export default UsuarioForm;