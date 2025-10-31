import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Para navegar
import { FaPlus } from 'react-icons/fa'; // Ícono para el botón

export default function UsuariosAdmin() {
  // Aquí tendrías tu lógica para obtener los usuarios
  // const { usuarios } = useAuth(); o similar

  const usuarios = [
    { id: 1, name: "Administrador", email: "admin@mrpastel.cl", role: "admin" },
    { id: 2, name: "Cliente de Prueba", email: "cliente@mrpastel.cl", role: "user" }
  ];

  return (
    <>
      {/* --- ESTA ES LA PARTE NUEVA --- */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Gestión de Usuarios</h1>
        {/* El botón que te lleva al formulario */}
        <Button as={Link} to="/admin/usuarios/nuevo" variant="primary">
          <FaPlus className="me-2" />
          Agregar Usuario
        </Button>
      </div>
      {/* --- FIN DE LA PARTE NUEVA --- */}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2">Editar</Button>
                <Button variant="danger" size="sm">Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}