// src/hooks/useUsers.js
import { useState, useEffect } from 'react';
// Asegúrate de que la ruta a tu archivo de usuarios sea correcta
import { mockUsers } from '../data/seedUsers'; 

const LOCAL_STORAGE_KEY = 'users';

export function useUsers() {
  const [users, setUsers] = useState([]);

  // 1. Cargar usuarios desde localStorage al montar el componente
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setUsers(JSON.parse(stored));
    } else {
      // Si no hay nada, usa la data inicial (seed)
      setUsers(mockUsers);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mockUsers));
    }
  }, []); // El array vacío [] asegura que esto solo se ejecute una vez

  // 2. Función para guardar usuarios
  const saveUsers = (newUsers) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newUsers));
    setUsers(newUsers);
  };

  // 3. Función para ELIMINAR un usuario
  const deleteUser = (id) => {
    const newUsers = users.filter(u => u.id !== id);
    saveUsers(newUsers);
  };

  // 4. Función para AÑADIR un usuario
  const addUser = (user) => {
    // Genera un ID simple
    const newUser = { ...user, id: Date.now().toString() };
    const newUsers = [...users, newUser];
    saveUsers(newUsers);
  };

  // 5. Función para ACTUALIZAR un usuario
  const updateUser = (id, updatedUser) => {
    const newUsers = users.map(u =>
      u.id === id ? { ...u, ...updatedUser, id: u.id } : u
    );
    saveUsers(newUsers);
  };

  // 6. Función para OBTENER un usuario por ID
  const getUser = (id) => {
    return users.find(u => u.id === id);
  };

  // 7. Expone la lista de usuarios y las funciones
  return { users, getUser, addUser, updateUser, deleteUser };
}