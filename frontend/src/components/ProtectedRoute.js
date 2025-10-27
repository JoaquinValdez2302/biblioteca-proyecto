// src/components/ProtectedRoute.js
"use client";
import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { CircularProgress, Box } from '@mui/material'; // Para mostrar carga

export default function ProtectedRoute({ children }) {
  const { usuario, cargando } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Si no está cargando y no hay usuario, redirigir al login
    if (!cargando && !usuario) {
      router.push('/login');
    }
  }, [usuario, cargando, router]);

  // Mientras verifica la sesión, muestra un indicador de carga
  if (cargando) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Si hay usuario, muestra el contenido de la página protegida
  if (usuario) {
    return <>{children}</>;
  }

  // Si no hay usuario (y ya no está cargando), no muestra nada (será redirigido)
  return null; 
}