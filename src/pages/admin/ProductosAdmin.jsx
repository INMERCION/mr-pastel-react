import React, { useState } from 'react';
import { useProducts } from '../../context/ProductsContext'; // Hook del Contexto
import ProductoForm from './ProductoForm'; // Formulario
import { Table, Button, Modal, Container, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Iconos

function ProductosAdmin() {
  // 1. Consumir el contexto
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();

  // 2. Estados locales para manejar el modal y la edición
  const [showModal, setShowModal] = useState(false);
  // currentProduct guarda el producto que se está editando
  const [currentProduct, setCurrentProduct] = useState(null); 

  // 3. Funciones para manejar el modal
  const handleShowModal = () => {
    setCurrentProduct(null); // Resetea a null para modo "Crear"
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentProduct(null);
  };

  // 4. Función para abrir el modal en modo "Editar"
  const handleEdit = (product) => {
    setCurrentProduct(product); // Carga el producto en el estado
    setShowModal(true); // Abre el modal (que leerá currentProduct)
  };

  // 5. Función para eliminar (con confirmación)
  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      deleteProduct(id);
    }
  };

  // 6. Función que se pasa al formulario (ProductoForm)
  // Decide si debe crear o actualizar
  const handleFormSubmit = (productData) => {
    if (currentProduct) {
      // Modo Editar
      updateProduct({ ...productData, id: currentProduct.id });
    } else {
      // Modo Crear
      addProduct(productData);
    }
    handleCloseModal(); // Cierra el modal después de enviar
  };
  
  // Función para formatear el precio (opcional)
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CL', { 
      style: 'currency', 
      currency: 'CLP' 
    }).format(value);
  };

  return (
    <Container fluid>
      <Row className="my-3">
        <Col>
          <h2>Gestión de Productos</h2>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={handleShowModal}>
            Crear Nuevo Producto
          </Button>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <img 
                  src={product.imagen} 
                  alt={product.nombre} 
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                />
              </td>
              <td>{product.nombre}</td>
              <td>{product.categoria}</td>
              <td>{formatCurrency(product.precio)}</td>
              <td>
                <Button 
                  variant="warning" 
                  size="sm" 
                  className="me-2"
                  onClick={() => handleEdit(product)}
                >
                  <FaEdit />
                </Button>
                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={() => handleDelete(product.id)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para Crear/Editar Producto */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {currentProduct ? 'Editar Producto' : 'Crear Nuevo Producto'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductoForm 
            initialData={currentProduct}
            onSubmitForm={handleFormSubmit}
            onCancel={handleCloseModal}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default ProductosAdmin;