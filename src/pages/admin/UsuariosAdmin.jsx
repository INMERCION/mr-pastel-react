import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext'; // Importamos useAuth para ROLES

function UsuarioForm({ initialData, onSubmitForm, onCancel }) {
  
  const { ROLES } = useAuth(); // Obtenemos los roles del contexto
  const [role, setRole] = useState(ROLES.USER);

  // Si recibimos initialData (modo editar), llenamos el formulario
  useEffect(() => {
    if (initialData) {
      setRole(initialData.role || ROLES.USER);
    }
  }, [initialData, ROLES.USER]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviamos el ID del usuario y el nuevo rol
    onSubmitForm(initialData.id, role);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <p>Editando a: <strong>{initialData?.name}</strong> ({initialData?.email})</p>
      
      <Form.Group className="mb-3" controlId="formRole">
        <Form.Label>Rol del Usuario</Form.Label>
        <Form.Select
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value={ROLES.ADMIN}>Administrador</option>
          <option value={ROLES.USER}>Usuario</option>
        </Form.Select>
      </Form.Group>
      
      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="primary" type="submit">
          Actualizar Rol
        </Button>
      </div>
    </Form>
  );
}

export default UsuarioForm;