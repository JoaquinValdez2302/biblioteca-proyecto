// src/components/FormularioNuevoSocio.js
"use client";
import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

export default function FormularioNuevoSocio({ alAgregar, alCancelar }) {
  const [nombre, setNombre] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"; // Fallback por si acaso

      // 2. Usar apiUrl para construir la URL completa
      const response = await fetch(`${apiUrl}/api/socios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombreCompleto: nombre, dni, email, telefono }),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Error al guardar socio");
      const nuevoSocio = await response.json();
      alAgregar(nuevoSocio); // Llama a la función del padre
    } catch (error) {
      console.error(error);
      // Aquí podrías mostrar un error
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Nombre Completo"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="DNI"
        value={dni}
        onChange={(e) => setDni(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Email (opcional)"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Teléfono (opcional)"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={alCancelar} className="modalCancelButton">
          Cancelar
        </Button>
        <Button type="submit" variant="contained" className="modalConfirmButton">
          Agregar Socio
        </Button>
      </Box>
    </Box>
  );
}
