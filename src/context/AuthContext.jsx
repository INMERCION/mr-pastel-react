import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([]); 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Recuperar sesión desde localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const userData = JSON.parse(stored);
        setUser(userData);
        // Verificar token válido
        const token = localStorage.getItem("token");
        if (!token) {
          signOut();
        }
      }
    } catch (err) {
      console.error("Error rehidratando usuario:", err);
      signOut();
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar lista de usuarios (solo para admin)
  useEffect(() => {
    if (user?.role === 'admin') {
      fetchUsers();
    }
  }, [user]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/usuarios`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Error cargando usuarios");
      const data = await response.json();
      
      // Mapear campos del backend al formato del frontend
      const mappedUsers = data.map(user => ({
        id: user.id,
        rut: user.rut,
        name: user.nombre,
        email: user.email,
        role: user.rol === 'ADMIN' ? 'admin' : 'user'
      }));
      
      setUsers(mappedUsers);
    } catch (err) {
      console.error("Error cargando usuarios:", err);
    }
  };

  const signIn = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) {
        const error = await response.json();
        console.error("Error en login:", error);
        return false;
      }

      const data = await response.json();
      
      console.log('📥 Datos del login:', data); // DEBUG
      
      const safeUser = {
        id: data.id,
        email: data.email,
        role: (data.rol === 'ADMIN' || data.role === 'admin') ? 'admin' : 'user',
        name: data.nombre || data.name,
        rut: data.rut
      };
      
      console.log('✅ Usuario mapeado:', safeUser); // DEBUG
      
      setUser(safeUser);
      localStorage.setItem("user", JSON.stringify(safeUser));
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuarioId", data.id);
      
      return safeUser;
    } catch (err) {
      console.error("Error en login:", err);
      return false;
    }
  };

  const signOut = () => {
    setUser(null);
    setUsers([]);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioId");
  };

  const addUser = async (newUser) => {
    try {
      const token = localStorage.getItem("token");
      
      // Mapear campos del frontend al formato del backend
      const backendUser = {
        nombre: newUser.name,
        email: newUser.email,
        rut: newUser.rut,
        password: newUser.password, // ✅ Agregar contraseña
        rol: newUser.role === 'admin' ? 'ADMIN' : 'USUARIO'
      };
      
      const response = await fetch(`${API_URL}/api/usuarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(backendUser)
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.message || "Error al crear usuario");
        return false;
      }

      await fetchUsers();
      return true;
    } catch (err) {
      console.error("Error creando usuario:", err);
      alert("Error al crear usuario");
      return false;
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      const token = localStorage.getItem("token");
      
      // Mapear campos del frontend al formato del backend
      const backendUser = {
        nombre: updatedUser.name,
        email: updatedUser.email,
        rut: updatedUser.rut,
        rol: updatedUser.role === 'admin' ? 'ADMIN' : 'USUARIO'
      };

      // Solo incluir password si se proporcionó una nueva
      if (updatedUser.password && updatedUser.password.trim() !== '') {
        backendUser.password = updatedUser.password;
      }
      
      const response = await fetch(`${API_URL}/api/usuarios/${updatedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(backendUser)
      });

      if (!response.ok) throw new Error("Error al actualizar usuario");

      // Si es el usuario actual, actualizar localStorage
      if (user.id === updatedUser.id) {
        const newUserData = { ...user, ...updatedUser };
        setUser(newUserData);
        localStorage.setItem("user", JSON.stringify(newUserData));
      }

      await fetchUsers();
      return true;
    } catch (err) {
      console.error("Error actualizando usuario:", err);
      return false;
    }
  };

  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/usuarios/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error("Error al eliminar usuario");

      await fetchUsers();
      return true;
    } catch (err) {
      console.error("Error eliminando usuario:", err);
      return false;
    }
  };

  const isAdmin = user?.role === "admin";

  const value = {
    user,
    isAdmin,
    signIn,
    signOut,
    loading,
    users,
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