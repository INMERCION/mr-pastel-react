import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

// Recibe:
// - initialData: Un producto existente (para modo "Editar")
// - onSubmitForm: La función (addProduct o updateProduct) que se llamará
// - onCancel: Función para cerrar el formulario/modal
function ProductoForm({ initialData, onSubmitForm, onCancel }) {
  
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    categoria: 'Tortas',
    precio: 0,
    stock: 0,
    imagen: ''
  });

  // Si recibimos initialData (modo editar), llenamos el formulario
  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        nombre: initialData.nombre || '',
        descripcion: initialData.descripcion || '',
        categoria: initialData.categoria || 'Tortas',
        precio: initialData.precio || 0,
        stock: initialData.stock || 0,
        imagen: initialData.imagen || ''
      });
    } else {
      // Modo crear (resetea el form)
      setFormData({ 
        nombre: '', 
        descripcion: '',
        categoria: 'Tortas', 
        precio: 0, 
        stock: 0,
        imagen: '' 
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convertimos el precio a número y stock a entero antes de enviar
    onSubmitForm({ 
      ...formData, 
      precio: parseFloat(formData.precio),
      stock: parseInt(formData.stock)
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={12}>
          <Form.Group className="mb-3" controlId="formNombre">
            <Form.Label>Nombre Producto</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              placeholder="Ej: Torta de Chocolate"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Form.Group className="mb-3" controlId="formDescripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Describe el producto..."
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Form.Group className="mb-3" controlId="formCategoria">
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
            >
              {/* Opciones basadas en tu products.js */}
              <option value="Tortas">Tortas</option>
              <option value="Postres">Postres</option>
              <option value="Sin Azúcar">Sin Azúcar</option>
              <option value="Panadería">Panadería</option>
              <option value="Sin Gluten">Sin Gluten</option>
              <option value="Veganos">Veganos</option>
              <option value="Especiales">Especiales</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="formPrecio">
            <Form.Label>Precio (CLP)</Form.Label>
            <Form.Control
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              required
              min="0"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="formStock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              min="0"
            />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-3" controlId="formImagen">
        <Form.Label>URL Imagen</Form.Label>
        <Form.Control
          type="text"
          name="imagen"
          value={formData.imagen}
          onChange={handleChange}
          placeholder="/images/producto.jpg"
        />
      </Form.Group>      
      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="primary" type="submit">
          {initialData ? 'Actualizar Producto' : 'Crear Producto'}
        </Button>
      </div>
    </Form>
  );
}

export default ProductoForm;