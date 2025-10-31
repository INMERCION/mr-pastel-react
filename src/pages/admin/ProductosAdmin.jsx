// src/pages/admin/ProductosAdmin.jsx
import React, { useState } from 'react';
import { Table, Button, Image, Modal, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { useProducts } from '../../hooks/useProducts'; // Importa el hook

export default function ProductosAdmin() {
  // Usa el hook para obtener los productos y la función de eliminar
  const { products, deleteProduct } = useProducts();

  // --- Lógica del Modal de Confirmación ---
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleShowModal = (product) => {
    setProductToDelete(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setProductToDelete(null);
    setShowModal(false);
  };

  const handleDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id); // Usa el ID del producto
      handleCloseModal();
    }
  };
  // --- Fin de la lógica del Modal ---

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Gestión de Productos</h1>
        {/* Botón para ir al formulario de "Agregar Producto" */}
        <LinkContainer to="/admin/productos/nuevo">
          <Button variant="primary">
            <FaPlus className="me-2" />
            Agregar Producto
          </Button>
        </LinkContainer>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapea los productos. Usa los campos correctos: name, img, price, stock */}
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <Image src={product.img} thumbnail width="50" alt={product.name} />
              </td>
              <td>{product.name}</td>
              <td>${product.price.toLocaleString('es-CL')}</td>
              <td>
                {/* Lógica de Badges para el stock */}
                {product.stock === 0 ? (
                  <Badge bg="danger">Agotado</Badge>
                ) : product.stock < 10 ? (
                  <Badge bg="warning">{product.stock}</Badge>
                ) : (
                  <Badge bg="success">{product.stock}</Badge>
                )}
              </td>
              <td>
                {/* Botón para ir al formulario de "Editar" */}
                <LinkContainer to={`/admin/productos/editar/${product.id}`}>
                  <Button variant="warning" size="sm" className="me-2">
                    <FaEdit />
                  </Button>
                </LinkContainer>
                
                {/* Botón para abrir el modal de "Eliminar" */}
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={() => handleShowModal(product)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* --- Modal de Confirmación --- */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar el producto: 
          <strong> {productToDelete?.name}</strong>? 
          Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}