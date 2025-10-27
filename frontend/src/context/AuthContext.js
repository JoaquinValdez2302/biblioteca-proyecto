// src/context/AuthContext.js
"use client";
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Creamos el contexto
const AuthContext = createContext(null);

// Creamos el proveedor del contexto
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true); // Para saber si estamos verificando la sesión
  const router = useRouter();

  // Efecto para verificar si hay una sesión activa al cargar la app
  useEffect(() => {
    const verificarSesion = async () => {
      try {
        // Hacemos una petición a un endpoint (que crearemos) para saber si hay sesión
        const response = await fetch('http://localhost:3001/api/auth/status', {
          credentials: 'include' // IMPORTANTE: envía las cookies de sesión
        });
        if (response.ok) {
          const data = await response.json();
          setUsuario(data.usuario); // Guardamos el usuario si hay sesión
        } else {
          setUsuario(null); // No hay sesión
        }
      } catch (error) {
        console.error("Error verificando sesión:", error);
        setUsuario(null);
      } finally {
        setCargando(false); // Terminamos de cargar
      }
    };
    verificarSesion();
  }, []);

  // Función para que el LoginForm actualice el usuario al loguear
  const login = (userData) => {
    setUsuario(userData);
  };

  // Función para desloguear
  const logout = async () => {
    try {
      await fetch('http://localhost:3001/api/auth/logout', { 
        method: 'POST', 
        credentials: 'include' 
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      setUsuario(null); // Limpiamos el usuario del estado
      router.push('/login'); // Redirigimos al login
    }
  };

  // Valor que proveerá el contexto
  const value = { usuario, cargando, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para usar el contexto fácilmente
export function useAuth() {
  return useContext(AuthContext);
}