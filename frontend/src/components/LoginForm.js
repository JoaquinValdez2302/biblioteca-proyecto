// src/components/LoginForm.js
"use client";
import React, { useState } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
// Importamos useRouter para redirigir después del login
import { useRouter } from 'next/navigation'; 
import { useAuth } from '@/context/AuthContext';

export default function LoginForm() {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState(''); // Para mostrar mensajes de error
  const router = useRouter(); // Hook para la navegación
  const { login } = useAuth();


  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Limpiar errores previos

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombreUsuario, contraseña }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.mensaje || 'Error al iniciar sesión');
      }

      // ¡Login exitoso!
      console.log('Login exitoso:', data.usuario);
      // Aquí podrías guardar la información del usuario en un estado global (Context, Zustand, Redux)
      // o simplemente redirigir.
      login(data.usuario);
      router.push('/'); // Redirigir a la página principal

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="nombreUsuario"
        label="Nombre de Usuario"
        name="nombreUsuario"
        autoComplete="username"
        autoFocus
        value={nombreUsuario}
        onChange={(e) => setNombreUsuario(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="contraseña"
        label="Contraseña"
        type="password"
        id="contraseña"
        autoComplete="current-password"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
      />
      {/* Mostrar mensaje de error si existe */}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Ingresar
      </Button>
    </Box>
  );
}