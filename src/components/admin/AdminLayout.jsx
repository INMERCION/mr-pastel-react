import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SidebarAdmin from './SidebarAdmin';
import { Button } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import './AdminLayout.css'; 

export default function AdminLayout() {
  // 'isCollapsed' ahora significa "colapsado" en desktop
  // y "cerrado" en móvil.
  const [isCollapsed, setIsCollapsed] = useState(true); // Empezar colapsado (cerrado)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    // 1. Usamos la clase 'collapsed' para controlar ambos modos
    <div className={`admin-layout ${isCollapsed ? 'collapsed' : ''}`}>
      
      {/* 2. Botón de Toggle (AHORA ESTÁ AQUÍ) */}
      {/* Este botón siempre será visible y se reposicionará con CSS */}
      <Button 
        variant="light" 
        onClick={toggleSidebar} 
        className="admin-toggle-btn"
      >
        <FaBars />
      </Button>

      {/* 3. Backdrop (overlay oscuro) para modo móvil */}
      {/* Solo aparece si el menú está abierto (not collapsed) */}
      <div className="sidebar-backdrop" onClick={toggleSidebar}></div>
      
      {/* 4. Sidebar (ya no necesita la prop 'toggleSidebar') */}
      <SidebarAdmin isCollapsed={isCollapsed} />

      <main className="admin-content">
        <Outlet /> 
      </main>
    </div>
  );
}