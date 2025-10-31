// src/pages/admin/AdminFormUsuario.jsx
import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useUsers } from '../../hooks/useUsers'; // Importa el nuevo hook

export default function AdminFormUsuario() {
  const { id } = useParams(); // 'id' de la URL para modo "Editar"
  const navigate = useNavigate();
  const { getUser, addUser, updateUser } = useUsers();
  
  const [isEditMode] = useState(!!id);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pass: '', // 'pass' en lugar de 'password' para coincidir con tu seed
    role: 'user', 
  });

  // Si es modo "Editar", carga los datos del usuario
  useEffect(() => {
    if (isEditMode) {
      const user = getUser(id);
      if (user) {
        // Carga los datos, pero deja el password en blanco por seguridad
        setFormData({
          name: user.name,
          email: user.email,
          pass: '', // Deja el password vacío
          role: user.role,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditMode) {
      // --- Lógica de Edición ---
      const updatedData = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
      };

      // SOLO actualiza el password si el usuario escribió uno nuevo
      if (formData.pass !== '') {
        updatedData.pass = formData.pass;
      }
      
      updateUser(id, updatedData);
    } else {
      // --- Lógica de Creación ---
      addUser(formData);
    }

    // Redirige de vuelta a la lista
    navigate('/admin/usuarios');
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title as="h2" className="mb-4">
          {isEditMode ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}
        </Card.Title>
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="pass">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="pass"
              value={formData.pass}
              onChange={handleChange}
              // Es requerido solo si NO estamos en modo edición
              required={!isEditMode}
              placeholder={isEditMode ? 'Dejar en blanco para no cambiar' : ''}
            />
            {isEditMode && <Form.Text muted>
              Si dejas este campo vacío, la contraseña actual no se modificará.
            </Form.Text>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="role">
            <Form.Label>Rol</Form.Label>
            <Form.Select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">Usuario (Cliente)</option>
              <option value="admin">Administrador</option>
            </Form.Select>
          </Form.Group>
          
          <div className="text-end">
            <Button 
              variant="secondary" 
              className="me-2" 
              onClick={() => navigate('/admin/usuarios')}
            >
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {isEditMode ? 'Actualizar Usuario' : 'Guardar Usuario'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}