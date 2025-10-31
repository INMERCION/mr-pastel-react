import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  // Usuarios simulados
  const mockUsers = [
    { id: 1, email: "admin@mrpastel.cl", pass: "admin123", role: "admin", name: "Administrador" },
    { id: 2, email: "cliente@mrpastel.cl", pass: "cliente123", role: "user", name: "Cliente de Prueba" },
  ];

  const [user, setUser] = useState(null);

  // Recuperar sesión persistida
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // Iniciar sesión
  const signIn = async (email, password) => {
    const found = mockUsers.find((u) => u.email === email && u.pass === password);
    if (found) {
      setUser(found);
      localStorage.setItem("user", JSON.stringify(found));
      return true;
    }
    return false;
  };

  // Cerrar sesión
  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, isAdmin, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
