import { createContext, useState, useContext, useEffect } from "react";
// 1. IMPORTAMOS LOS USUARIOS DEL ARCHIVO QUE NOS DISTE
import { seedUsers } from '../data/seedUsers.js';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  
  // 2. Usamos seedUsers como estado inicial (en lugar de mockUsers)
  const [users, setUsers] = useState(seedUsers); 
  
  const [user, setUser] = useState(null); // El usuario con sesión iniciada
  const [loading, setLoading] = useState(true);

  // Recuperar sesión persistida (rehidratación)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Error rehidratando usuario desde localStorage:", err);
      localStorage.removeItem("user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // 3. Modificamos signIn para que use la lista de estado 'users'
  const signIn = async (email, password) => {
    // Usamos 'users' (del estado) y 'password' (del mock)
    const found = users.find((u) => u.email === email && u.password === password); 
    
    if (found) {
      // No guardar la contraseña en localStorage por seguridad
      const safeUser = {
        id: found.id,
        email: found.email,
        role: found.role,
        name: found.name,
        rut: found.rut // Agregamos RUT
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

  // --- 4. NUEVAS FUNCIONES CRUD PARA EL ADMIN ---
  
  const addUser = (newUser) => {
    // Validar que el email o RUT no existan (opcional pero recomendado)
    const emailExists = users.some(u => u.email === newUser.email);
    const rutExists = users.some(u => u.rut === newUser.rut);

    if (emailExists || rutExists) {
      alert("El email o RUT ya están registrados.");
      return false; // No se pudo agregar
    }

    const userWithId = {
      ...newUser,
      id: users.length + 1 // Simulación de ID
    };
    setUsers([...users, userWithId]);
    return true; // Éxito
  };

  const updateUser = (updatedUser) => {
    setUsers(users.map(u => 
      u.id === updatedUser.id ? { ...u, ...updatedUser } : u
    ));
  };

  const deleteUser = (userId) => {
    setUsers(users.filter(u => u.id !== userId));
  };

  // 5. EXPONEMOS LOS NUEVOS VALORES
  const value = {
    user,
    isAdmin,
    signIn,
    signOut,
    loading,
    users, // La lista completa de usuarios
    addUser,
    updateUser,
    deleteUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}