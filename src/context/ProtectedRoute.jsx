import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ adminOnly = false, children }) {
  const { user, isAdmin, loading } = useAuth();

  // Mientras rehidratamos la sesión, no redirigimos (evita un redirect flash)
  if (loading) return null;

  if (!user) return <Navigate to="/login" />;
  if (adminOnly && !isAdmin) return <Navigate to="/" />;

  return children;
}
