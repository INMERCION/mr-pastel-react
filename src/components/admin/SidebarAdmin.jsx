import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Accordion, Button } from 'react-bootstrap'; // Importar Button
import { 
  FaUsers, 
  FaBox, 
  FaPlus, 
  FaTachometerAlt, 
  FaList, 
  FaArrowLeft,
  FaBars // <- Importar el ícono de barras
} from 'react-icons/fa'; 

// 1. Recibimos 'toggleSidebar' de nuevo
export default function SidebarAdmin({ isCollapsed, toggleSidebar }) {
  return (
    <Nav className="admin-sidebar" defaultActiveKey="/admin">
      <div className="sidebar-header">
        {/* Mostramos el título si no está colapsado */}
        { !isCollapsed && <h3>Panel Admin</h3> }
        
        {/* 2. Botón de Toggle (SOLO PARA DESKTOP) */}
        {/* Este botón está en el flujo normal, no tapará nada */}
        <Button 
          variant="light" 
          onClick={toggleSidebar} 
          className="sidebar-toggle-btn-desktop" // <- Nueva clase
        >
          <FaBars />
        </Button>
      </div>
      
      {/* El resto del componente queda exactamente igual */}
      
      {/* Enlace al Dashboard */}
      <Nav.Link as={NavLink} to="/admin" end>
        <FaTachometerAlt /> 
        { !isCollapsed && ' Dashboard' }
      </Nav.Link>
      
      <Accordion flush>
        {/* ... (Accordion de Usuarios sin cambios) ... */}
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
           
          </Accordion.Body>
        </Accordion.Item>

        {/* ... (Accordion de Productos sin cambios) ... */}
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