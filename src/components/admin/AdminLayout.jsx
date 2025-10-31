import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarAdmin from './SidebarAdmin';
import './AdminLayout.css'; // Crearemos este CSS para el layout

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      {/* 1. El Menú Lateral (Sidebar) */}
      <SidebarAdmin />

      {/* 2. El Contenido Principal de Admin */}
      <main className="admin-content">
        {/* Aquí es donde se renderizarán las sub-páginas (usuarios, productos, etc.) */}
        
        <Outlet /> 
      </main>
    </div>
  );
}