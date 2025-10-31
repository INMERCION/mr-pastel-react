import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Accordion } from 'react-bootstrap';
// Importamos los íconos
import { 
  FaUsers, 
  FaBox, 
  FaPlus, 
  FaTachometerAlt, 
  FaList, 
  FaArrowLeft 
} from 'react-icons/fa'; 

// 1. El componente ahora solo recibe 'isCollapsed'
export default function SidebarAdmin({ isCollapsed }) {
  return (
    <Nav className="admin-sidebar" defaultActiveKey="/admin">
      <div className="sidebar-header">
        {/* 2. El botón de toggle se fue a AdminLayout */}
        { !isCollapsed && <h3>Panel Admin</h3> }
      </div>
      
      {/* Enlace al Dashboard */}
      <Nav.Link as={NavLink} to="/admin" end>
        <FaTachometerAlt /> 
        {/* 3. La lógica de texto es la misma */}
        { !isCollapsed && ' Dashboard' }
      </Nav.Link>
      
      <Accordion flush>
        
        {/* Grupo Usuarios */}
        <Accordion.Item eventKey="0" className="sidebar-accordion-item">
          <Accordion.Header>
            <FaUsers /> 
            { !isCollapsed && 'Usuarios' }
          </Accordion.Header>
          <Accordion.Body>
            <Nav.Link as={NavLink} to="/admin/usuarios">
              <FaList /> 
              { !isCollapsed && 'Ver Lista' }
            </Nav.Link>
            <Nav.Link as={NavLink} to="/admin/usuarios/nuevo">
              <FaPlus /> 
              { !isCollapsed && 'Agregar Usuario' }
            </Nav.Link>
          </Accordion.Body>
        </Accordion.Item>

        {/* Grupo Productos */}
        <Accordion.Item eventKey="1" className="sidebar-accordion-item">
          <Accordion.Header>
            <FaBox /> 
            { !isCollapsed && 'Productos' }
          </Accordion.Header>
          <Accordion.Body>
            <Nav.Link as={NavLink} to="/admin/productos">
              <FaList /> 
              { !isCollapsed && 'Ver Lista' }
            </Nav.Link>
            <Nav.Link as={NavLink} to="/admin/productos/nuevo">
              <FaPlus /> 
              { !isCollapsed && 'Agregar Producto' }
            </Nav.Link>
          </Accordion.Body>
        </Accordion.Item>

      </Accordion>

      {/* Enlace para volver (al final) */}
      <Nav.Link as={NavLink} to="/" className="mt-auto">
        <FaArrowLeft />
        { !isCollapsed && ' Volver a la tienda' }
      </Nav.Link>
    </Nav>
  );
}