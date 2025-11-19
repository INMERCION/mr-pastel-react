// ============================================
// ARCHIVO: mr-pastel-react/src/context/AuthContext.jsx
// Integración con APIs Backend
// ============================================

import React, { createContext, useReducer, useCallback } from 'react';
import { authAPI } from '../services/api';

export const AuthContext = createContext();

const initialState = {
  isAuthenticated: !!localStorage.getItem('token'),
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null,
      };
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = useCallback(async (email, password) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await authAPI.login(email, password);
      
      // Guardar en localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('usuarioId', response.id || '1'); // Guardar ID usuario
      localStorage.setItem('user', JSON.stringify({
        email: response.email,
        nombre: response.nombre,
        rol: response.rol
      }));

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          token: response.token,
          user: {
            email: response.email,
            nombre: response.nombre,
            rol: response.rol,
          }
        }
      });
      
      return response;
    } catch (error) {
      const errorMessage = error.message || 'Error en el login';
      dispatch({ type: 'LOGIN_ERROR', payload: errorMessage });
      throw error;
    }
  }, []);

  const registro = useCallback(async (nombre, email, password) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await authAPI.registro(nombre, email, password);
      
      localStorage.setItem('token', response.token);
      localStorage.setItem('usuarioId', response.id || '1');
      localStorage.setItem('user', JSON.stringify({
        email: response.email,
        nombre: response.nombre,
        rol: response.rol
      }));

      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: {
          token: response.token,
          user: {
            email: response.email,
            nombre: response.nombre,
            rol: response.rol,
          }
        }
      });
      
      return response;
    } catch (error) {
      const errorMessage = error.message || 'Error en el registro';
      dispatch({ type: 'LOGIN_ERROR', payload: errorMessage });
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('usuarioId');
    dispatch({ type: 'LOGOUT' });
  }, []);

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      registro,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
