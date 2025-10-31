// src/pages/admin/AdminHome.jsx
// Hace: dashboard (KPIs: #productos, agotados, bajo stock).
import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaBox, FaExclamationTriangle, FaBan, FaUsers, FaPlus } from 'react-icons/fa';

// --- IMPORTANTE ---
// 1. Asegúrate de que la ruta a tus datos sea correcta.
//    (Podría ser '../data/products.js' o '../../data/products.js' 
//    dependiendo de tu estructura de carpetas)
import  products  from '../../data/products'; 

// 2. Importa tus usuarios. Usaremos mockUsers de tu AuthContext,
//    pero es mejor si tienes un 'seedUsers.js' separado para esto.
//    Ajusta la ruta según sea necesario.
import { mockUsers } from '../../data/seedUsers'; 

export default function AdminHome() {
  
  // --- 1. Calcular KPIs ---
  
  // KPI de Productos
  const totalProductos = products.length;
  const productosAgotados = products.filter(p => p.stock === 0).length;
  // Definimos "bajo stock" como 1-9 unidades
  const productosBajoStock = products.filter(p => p.stock > 0 && p.stock < 10).length;
  
  // KPI de Usuarios (si tienes el archivo mockUsers)
  const totalUsuarios = mockUsers.length;

  return (
    <>
      <h1 className="mb-4">Dashboard</h1>
      
      {/* --- Fila de KPIs --- */}
      <Row xs={1} md={2} xl={4} className="g-4 mb-4">
        
        {/* KPI: Total Productos */}
        <Col>
          <Card bg="primary" text="white" className="shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <FaBox size={40} className="me-3" />
              <div>
                <Card.Title as="h2" className="mb-0">{totalProductos}</Card.Title>
                <Card.Text>Productos Totales</Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* KPI: Total Usuarios */}
        <Col>
          <Card bg="info" text="white" className="shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <FaUsers size={40} className="me-3" />
              <div>
                <Card.Title as="h2" className="mb-0">{totalUsuarios}</Card.Title>
                <Card.Text>Usuarios Registrados</Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* KPI: Bajo Stock */}
        <Col>
          <Card bg="warning" text="dark" className="shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <FaExclamationTriangle size={40} className="me-3" />
              <div>
                <Card.Title as="h2" className="mb-0">{productosBajoStock}</Card.Title>
                <Card.Text>Productos (Bajo Stock)</Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* KPI: Agotados */}
        <Col>
          <Card bg="danger" text="white" className="shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <FaBan size={40} className="me-3" />
              <div>
                <Card.Title as="h2" className="mb-0">{productosAgotados}</Card.Title>
                <Card.Text>Productos Agotados</Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* --- Fila de Accesos Rápidos --- */}
      <Row>
        <Col>
          <h2 className="h4 mb-3">Accesos Rápidos</h2>
          
          {/* LinkContainer combina React Router con React Bootstrap.
            ¡Asegúrate de tener 'react-router-bootstrap' instalado!
            -> npm install react-router-bootstrap 
          */}
          <LinkContainer to="/admin/productos/nuevo">
            <Button variant="success" className="me-2 mb-2">
              <FaPlus className="me-2" />
              Agregar Producto
            </Button>
          </LinkContainer>

          <LinkContainer to="/admin/productos">
            <Button variant="outline-primary" className="me-2 mb-2">
              <FaBox className="me-2" />
              Gestionar Productos
            </Button>
          </LinkContainer>

          <LinkContainer to="/admin/usuarios">
            <Button variant="outline-info" className="mb-2">
              <FaUsers className="me-2" />
              Gestionar Usuarios
            </Button>
          </LinkContainer>
          
        </Col>
      </Row>
    </>
  );
}