import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SidebarAdmin from './SidebarAdmin';
import { Button } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import './AdminLayout.css'; 

export default function AdminLayout() {
  // Dejamos 'false' por defecto para que en desktop aparezca abierto
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`admin-layout ${isCollapsed ? 'collapsed' : ''}`}>
      
      {/* 1. Este botón AHORA es SOLO para móvil */}
      <Button 
        variant="light" 
        onClick={toggleSidebar} 
        className="admin-toggle-btn-mobile" // <- Clase actualizada
      >
        <FaBars />
      </Button>

      {/* 2. Backdrop (sin cambios) */}
      <div className="sidebar-backdrop" onClick={toggleSidebar}></div>
      
      {/* 3. Pasamos la función de toggle al Sidebar */}
      <SidebarAdmin 
        isCollapsed={isCollapsed} 
        toggleSidebar={toggleSidebar} // <- La pasamos de nuevo
      />

      <main className="admin-content">
        <Outlet /> 
      </main>
    </div>
  );
}