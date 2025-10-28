// src/components/FormularioNuevoSocio.js
"use client";
import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const validarEmail = (email) => {
  if (!email) return true; // Email es opcional
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const validarDni = (dni) => {
  const re = /^[0-9]{7,8}$/;
  return re.test(String(dni));
};

const validarNombre = (nombre) => {
  const re = /^[a-zA-Z\s]+$/; // Permite letras (mayúsculas/minúsculas) y espacios
  return re.test(String(nombre));
};

const validarTelefono = (telefono) => {
  if (!telefono) return true; // Sigue siendo opcional
  const re = /^[0-9\s+-]+$/;
  return re.test(String(telefono));
};

export default function FormularioNuevoSocio({ alAgregar, alCancelar }) {
  const [nombre, setNombre] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [errorDni, setErrorDni] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorTelefono, setErrorTelefono] = useState("");
  const [errorGeneral, setErrorGeneral] = useState("");
  const [errorNombre, setErrorNombre] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorDni("");
    setErrorEmail("");
    setErrorGeneral("");
    setErrorNombre("");
    setErrorTelefono('');
    let esValido = true;

    if (!validarNombre(nombre)) {
      setErrorNombre("El nombre solo debe contener letras y espacios.");
      esValido = false;
    }

    if (!validarDni(dni)) {
      setErrorDni("El DNI debe tener 7 u 8 dígitos numéricos.");
      esValido = false;
    }
    if (!validarEmail(email)) {
      setErrorEmail("El formato del email no es válido.");
      esValido = false;
    }

    if (!validarTelefono(telefono)) {
      setErrorTelefono('El teléfono solo debe contener números, espacios, + o -.');
      esValido = false;
    }

    if (!esValido) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"; // Fallback por si acaso

      // 2. Usar apiUrl para construir la URL completa
      const response = await fetch(`${apiUrl}/api/socios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombreCompleto: nombre, dni, email, telefono }),
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) {
        // Mostrar error del backend
        throw new Error(data.mensaje || "Error al guardar socio");
      }
      alAgregar(data);
    } catch (error) {
      console.error(error);
      setErrorGeneral(error.message); // Mostrar error general
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
        error={!!errorNombre}
        helperText={errorNombre}
      />
      <TextField
        label="DNI"
        value={dni}
        onChange={(e) => setDni(e.target.value)}
        fullWidth
        margin="normal"
        required
        error={!!errorDni}
        helperText={errorDni}
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        required
        error={!!errorEmail}
        helperText={errorEmail}
      />
      <TextField
        label="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        fullWidth
        margin="normal"
        required
        error={!!errorTelefono}
        helperText={errorTelefono}
      />
      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={alCancelar} className="modalCancelButton">
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="contained"
          className="modalConfirmButton"
        >
          Agregar Socio
        </Button>
      </Box>
    </Box>
  );
}
