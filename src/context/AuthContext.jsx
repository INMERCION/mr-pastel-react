// src/context/AuthContext.jsx
import { createContext, useState, useContext } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  // 🔹 Usuarios de prueba (simulan una base de datos)
  const mockUsers = [
    { id: 1, email: "admin@mrpastel.cl", pass: "admin123", role: "admin", name: "Administrador" },
    { id: 2, email: "cliente@mrpastel.cl", pass: "cliente123", role: "user", name: "Cliente de Prueba" },
  ];

  const [user, setUser] = useState(null);

  // 🔐 Iniciar sesión
  const signIn = async (email, password) => {
    const found = mockUsers.find(
      (u) => u.email === email && u.pass === password
    );
    if (found) {
      setUser(found);
      return true;
    }
    return false;
  };

  // 🚪 Cerrar sesión
  const signOut = () => setUser(null);

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}
