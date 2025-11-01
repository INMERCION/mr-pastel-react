import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // Hook del Contexto
import UsuarioForm from './UsuarioForm'; // Formulario
import { Table, Button, Modal, Container, Row, Col, Badge } from 'react-bootstrap';
import { FaEdit, FaTrash, FaUserShield, FaUser } from 'react-icons/fa'; // Iconos

function UsuariosAdmin() {
  // 1. Consumir el contexto (ahora tiene todo lo que necesitamos)
  const { users, addUser, updateUser, deleteUser, user: currentUser } = useAuth();

  // 2. Estados locales para manejar el modal y la edición
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); 

  // 3. Funciones para manejar el modal
  const handleShowModal = () => {
    setSelectedUser(null); // Resetea a null para modo "Crear"
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  // 4. Función para abrir el modal en modo "Editar"
  const handleEdit = (user) => {
    setSelectedUser(user); // Carga el usuario en el estado
    setShowModal(true); // Abre el modal
  };

  // 5. Función para eliminar (con confirmación)
  const handleDelete = (userId) => {
    // Protección: No permitir que el admin se elimine a sí mismo
    if (userId === currentUser.id) {
      alert("No puedes eliminar tu propia cuenta de administrador.");
      return;
    }
    
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      deleteUser(userId);
    }
  };

  // 6. Función que se pasa al formulario (UsuarioForm)
  const handleFormSubmit = (userData) => {
    let success = false;
    if (selectedUser) {
      // Modo Editar
      updateUser(userData);
      success = true;
    } else {
      // Modo Crear
      success = addUser(userData); // addUser devuelve true/false
    }
    
    if (success) {
      handleCloseModal(); // Cierra el modal solo si fue exitoso
    }
  };
  
  return (
    <Container fluid>
      <Row className="my-3">
        <Col>
          <h2>Gestión de Usuarios</h2>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={handleShowModal}>
            Crear Nuevo Usuario
          </Button>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>RUT</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.rut}</td>
              <td>{user.email}</td>
              <td>
                {user.role === 'admin' ? (
                  <Badge bg="success" className="d-inline-flex align-items-center">
                    <FaUserShield className="me-1" /> Admin
                  </Badge>
                ) : (
                  <Badge bg="secondary" className="d-inline-flex align-items-center">
                    <FaUser className="me-1" /> Usuario
                  </Badge>
                )}
              </td>
              <td>
                <Button 
                  variant="warning" 
                  size="sm" 
                  className="me-2"
                  onClick={() => handleEdit(user)}
                >
                  <FaEdit />
                </Button>
                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={() => handleDelete(user.id)}
                  // Deshabilitar el botón si es el usuario actual
                  disabled={user.id === currentUser.id} 
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para Crear/Editar Usuario */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedUser ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UsuarioForm 
            initialData={selectedUser}
            onSubmitForm={handleFormSubmit}
            onCancel={handleCloseModal}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default UsuariosAdmin;