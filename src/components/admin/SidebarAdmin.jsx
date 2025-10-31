import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
// Importa los íconos que quieras, ej:
import { FaUsers, FaBox, FaPlus, FaTachometerAlt } from 'react-icons/fa'; 

export default function SidebarAdmin() {
  return (
    <Nav className="admin-sidebar" defaultActiveKey="/admin">
      <div className="sidebar-header">
        <h3>Panel Admin</h3>
      </div>
      
      <Nav.Link as={NavLink} to="/admin" end>
        <FaTachometerAlt /> Dashboard
      </Nav.Link>
      
      <Nav.Link as={NavLink} to="/admin/usuarios">
        <FaUsers /> Usuarios
      </Nav.Link>
      
      <Nav.Link as={NavLink} to="/admin/usuarios/nuevo">
        <FaPlus /> Agregar Usuario
      </Nav.Link>
      
      <Nav.Link as={NavLink} to="/admin/productos">
        <FaBox /> Productos
      </Nav.Link>
      
      <Nav.Link as={NavLink} to="/admin/productos/nuevo">
        <FaPlus /> Agregar Producto
      </Nav.Link>

      {/* Puedes agregar un enlace para volver a la tienda */}
      <Nav.Link as={NavLink} to="/" className="mt-auto">
        Volver a la tienda
      </Nav.Link>
    </Nav>
  );
}