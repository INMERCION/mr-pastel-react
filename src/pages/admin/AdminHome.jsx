// AdminHome.jsx - dashboard básico (placeholder).
import { Link } from 'react-router-dom';

export default function AdminHome() {
  return (
    <>
      <h1 className="mb-3">Admin</h1>
      <ul>
        <li><Link to="/admin/productos">Gestionar productos</Link></li>
        <li><Link to="/admin/usuarios">Gestionar usuarios</Link></li>
      </ul>
    </>
  );
}
