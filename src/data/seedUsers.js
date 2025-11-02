/**
 * Datos semilla para usuarios demo
 * Usado por AuthContext.jsx y Login.jsx
 */

export const seedUsers = [
  {
    id: 1,
    rut: '11.111.111-1',
    name: 'Administrador',
    email: 'admin@mrpastel.cl',
    role: 'admin',
    // Password: Admin2023!
    password: 'Admin2023'
  },
  {
    id: 2,
    rut: '12.345.678-9',
    name: 'Juan Pérez',
    email: 'jperez@gmail.com',
    role: 'user',
    // Password: Cliente2023!
    password: 'Cliente2023!'
  },
  {
    id: 3,
    rut: '9.876.543-2',
    name: 'María González',
    email: 'mgonzalez@outlook.com',
    role: 'user',
    // Password: Cliente2023!
    password: 'Cliente2023!'
  },
  {
    id: 4,
    rut: '15.432.765-K',
    name: 'Carlos Rodríguez',
    email: 'crodriguez@gmail.com',
    role: 'user',
    // Password: Cliente2023!
    password: 'Cliente2023!'
  }
];

// Roles disponibles en la aplicación
export const ROLES = {
  ADMIN: 'admin',
  USER: 'user'
};

// Función helper para buscar usuario por RUT
export const findUserByRut = (rut) => {
  return seedUsers.find(user => 
    user.rut.replace(/\./g, '').replace(/-/g, '') === 
    rut.replace(/\./g, '').replace(/-/g, '')
  );
};

// Función helper para buscar usuario por email
export const findUserByEmail = (email) => {
  return seedUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
};

export default seedUsers;