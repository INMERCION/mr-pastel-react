import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  // Usuarios simulados (solo para demo/local)
  const mockUsers = [
    { id: 1, email: "admin@mrpastel.cl", pass: "admin123", role: "admin", name: "Administrador" },
    { id: 2, email: "cliente@mrpastel.cl", pass: "cliente123", role: "user", name: "Cliente de Prueba" },
  ];

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // rehidratación

  // Recuperar sesión persistida (rehidratación)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (err) {
      // si hay problema con JSON.parse o storage, limpiar
      console.error("Error rehidratando usuario desde localStorage:", err);
      localStorage.removeItem("user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Iniciar sesión: devuelve el usuario sanitizado o false
  const signIn = async (email, password) => {
    const found = mockUsers.find((u) => u.email === email && u.pass === password);
    if (found) {
      // No guardar la contraseña en localStorage por seguridad
      const safeUser = {
        id: found.id,
        email: found.email,
        role: found.role,
        name: found.name,
      };
      setUser(safeUser);
      try {
        localStorage.setItem("user", JSON.stringify(safeUser));
      } catch (err) {
        console.error("Error guardando usuario en localStorage:", err);
      }
      return safeUser;
    }
    return false;
  };

  // Cerrar sesión
  const signOut = () => {
    setUser(null);
    try {
      localStorage.removeItem("user");
    } catch (err) {
      console.error("Error removiendo usuario de localStorage:", err);
    }
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, isAdmin, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
