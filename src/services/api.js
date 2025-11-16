// ============================================
// ARCHIVO: mr-pastel-react/src/services/api.js
// Servicio centralizado para todas las APIs
// ============================================

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// ========== UTILIDADES ==========

const getHeaders = (token = null) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
};

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  return await response.json();
};

// ========== AUTENTICACIÓN ==========

export const authAPI = {
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password })
    });
    return handleResponse(response);
  },

  registro: async (nombre, email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/registro`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ nombre, email, password })
    });
    return handleResponse(response);
  }
};

// ========== PRODUCTOS ==========

export const productosAPI = {
  obtenerTodos: async () => {
    const response = await fetch(`${API_BASE_URL}/productos`);
    return handleResponse(response);
  },

  obtenerPorId: async (id) => {
    const response = await fetch(`${API_BASE_URL}/productos/${id}`);
    return handleResponse(response);
  },

  obtenerPorCategoria: async (categoria) => {
    const response = await fetch(`${API_BASE_URL}/productos/categoria/${categoria}`);
    return handleResponse(response);
  },

  obtenerPorRegion: async (region) => {
    const response = await fetch(`${API_BASE_URL}/productos/region/${region}`);
    return handleResponse(response);
  },

  buscar: async (nombre) => {
    const response = await fetch(`${API_BASE_URL}/productos/buscar?nombre=${encodeURIComponent(nombre)}`);
    return handleResponse(response);
  },

  crear: async (producto, token) => {
    const response = await fetch(`${API_BASE_URL}/productos`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(producto)
    });
    return handleResponse(response);
  },

  actualizar: async (id, producto, token) => {
    const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
      method: 'PUT',
      headers: getHeaders(token),
      body: JSON.stringify(producto)
    });
    return handleResponse(response);
  },

  eliminar: async (id, token) => {
    const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
      method: 'DELETE',
      headers: getHeaders(token)
    });
    if (!response.ok) throw new Error('Error al eliminar');
  }
};

// ========== CARRITO ==========

export const carritoAPI = {
  obtenerCarrito: async (usuarioId, token) => {
    const response = await fetch(`${API_BASE_URL}/carrito/${usuarioId}`, {
      headers: getHeaders(token)
    });
    return handleResponse(response);
  },

  agregarProducto: async (usuarioId, productoId, cantidad, token) => {
    const response = await fetch(
      `${API_BASE_URL}/carrito/${usuarioId}/agregar?productoId=${productoId}&cantidad=${cantidad}`,
      {
        method: 'POST',
        headers: getHeaders(token)
      }
    );
    return handleResponse(response);
  },

  actualizarCantidad: async (usuarioId, itemId, cantidad, token) => {
    const response = await fetch(
      `${API_BASE_URL}/carrito/${usuarioId}/actualizar-item/${itemId}?cantidad=${cantidad}`,
      {
        method: 'PUT',
        headers: getHeaders(token)
      }
    );
    return handleResponse(response);
  },

  eliminarItem: async (usuarioId, itemId, token) => {
    const response = await fetch(
      `${API_BASE_URL}/carrito/${usuarioId}/eliminar-item/${itemId}`,
      {
        method: 'DELETE',
        headers: getHeaders(token)
      }
    );
    return handleResponse(response);
  },

  vaciarCarrito: async (usuarioId, token) => {
    const response = await fetch(
      `${API_BASE_URL}/carrito/${usuarioId}/vaciar`,
      {
        method: 'DELETE',
        headers: getHeaders(token)
      }
    );
    if (!response.ok) throw new Error('Error al vaciar carrito');
  }
};

// Exportar API base para usos avanzados
export { API_BASE_URL, getHeaders };
