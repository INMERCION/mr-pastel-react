// src/pages/admin/AdminFormProducto.jsx
import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts'; // Importa el hook

export default function AdminFormProducto() {
  // Obtiene el 'id' de la URL. Si existe, estamos en modo "Editar".
  const { id } = useParams();
  const navigate = useNavigate();
  // Trae las funciones necesarias del hook
  const { getProduct, addProduct, updateProduct } = useProducts();
  
  const [isEditMode] = useState(!!id); // Convierte el 'id' a booleano
  
  // Estado inicial del formulario, coincide con la estructura de datos
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    stock: 0,
    category: '',
    img: '',
    description: '',
  });

  // Si es modo "Editar", carga los datos del producto en el formulario
  useEffect(() => {
    if (isEditMode) {
      const product = getProduct(id); // Obtiene el producto por ID
      if (product) {
        setFormData(product); // Rellena el formulario con los datos
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isEditMode]); // No incluyas getProduct aquí para evitar loops

  // Manejador genérico para todos los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejador para el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convierte los valores de string a número antes de guardar
    const productData = {
      ...formData,
      price: parseInt(formData.price, 10),
      stock: parseInt(formData.stock, 10),
    };

    if (isEditMode) {
      updateProduct(id, productData); // Actualiza el producto existente
    } else {
      addProduct(productData); // Agrega un producto nuevo
    }

    // Redirige de vuelta a la lista de productos
    navigate('/admin/productos');
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title as="h2" className="mb-4">
          {isEditMode ? 'Editar Producto' : 'Agregar Nuevo Producto'}
        </Card.Title>
        
        <Form onSubmit={handleSubmit}>
          <Row>
            {/* Columna Izquierda */}
            <Col md={8}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Nombre del Producto</Form.Label>
                <Form.Control
                  type="text"
                  name="name" // Coincide con el estado
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="description" // Coincide con el estado
                  value={formData.description}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="img">
                <Form.Label>URL de la Imagen</Form.Label>
                <Form.Control
                  type="text"
                  name="img" // Coincide con el estado
                  value={formData.img}
                  onChange={handleChange}
                  placeholder="./images/nombre-imagen.jpg"
                />
              </Form.Group>
            </Col>

            {/* Columna Derecha (Sidebar) */}
            <Col md={4}>
              <Form.Group className="mb-3" controlId="price">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  name="price" // Coincide con el estado
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="stock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  name="stock" // Coincide con el estado
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="category">
                <Form.Label>Categoría</Form.Label>
                <Form.Select
                  name="category" // Coincide con el estado
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar...</option>
                  <option value="Tortas">Tortas</option>
                  <option value="Postres">Postres</option>
                  <option value="Saludable">Saludable</option>
                  <option value="Pastelería">Pastelería</option>
                  <option value="Sin Gluten">Sin Gluten</option>
                  <option value="Vegano">Vegano</option>
                  <option value="Especiales">Especiales</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          
          <div className="text-end">
            <Button 
              variant="secondary" 
              className="me-2" 
              onClick={() => navigate('/admin/productos')}
            >
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {isEditMode ? 'Actualizar Producto' : 'Guardar Producto'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}