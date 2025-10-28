// src/components/FormularioNuevoLibro.js
"use client";
import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const validarPrecio = (precio) => {
  if (precio === "" || precio === null) return false; // Precio es obligatorio
  const numPrecio = parseFloat(precio);
  return !isNaN(numPrecio) && numPrecio >= 0;
};
// Validación simple de ISBN
const validarIsbn = (isbn) => {
  if (!isbn) return false;
  const cleanedIsbn = isbn.replace(/-/g, "");
  return cleanedIsbn.length === 10 || cleanedIsbn.length === 13;
};

const validarTextoSimple = (texto) => {
  return texto && texto.trim().length > 0; // Verifica que no sea nulo y que no sean solo espacios
};

export default function FormularioNuevoLibro({ alAgregar, alCancelar }) {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [precio, setPrecio] = useState("");
  // Estados para errores específicos
  const [errorIsbn, setErrorIsbn] = useState("");
  const [errorPrecio, setErrorPrecio] = useState("");
  const [errorGeneral, setErrorGeneral] = useState("");
  const [errorTitulo, setErrorTitulo] = useState("");
  const [errorAutor, setErrorAutor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorIsbn("");
    setErrorPrecio("");
    setErrorGeneral("");
    setErrorTitulo("");
    setErrorAutor("");

    let esValido = true;

    if (!validarTextoSimple(titulo)) {
      setErrorTitulo("El título es obligatorio.");
      esValido = false;
    }

    if (!validarTextoSimple(autor)) {
      setErrorAutor("El autor es obligatorio.");
      esValido = false;
    }

    if (!validarIsbn(isbn)) {
      setErrorIsbn(
        "El ISBN debe tener 10 o 13 caracteres (guiones opcionales)."
      );
      esValido = false;
    }

    if (!validarPrecio(precio)) {
      setErrorPrecio(
        "El precio debe ser un número válido mayor o igual a cero."
      );
      esValido = false;
    }
    if (!titulo || !autor) {
      setErrorGeneral("Título y Autor son obligatorios."); // Usar error general para estos
      esValido = false;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

      // 2. Usar apiUrl para construir la URL completa
      const response = await fetch(`${apiUrl}/api/libros`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo,
          autor,
          isbn,
          precio: parseFloat(precio),
        }),
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) {
        // Mostrar error del backend (ej: ISBN duplicado)
        throw new Error(data.mensaje || "Error al guardar el libro.");
      }
      alAgregar(data);
    } catch (err) {
      console.error(err);
      // Mostrar error general si no es de validación local
      if (!errorTitulo && !errorAutor && !errorIsbn && !errorPrecio) {
        setErrorGeneral(err.message);
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        fullWidth
        margin="normal"
        required
        error={!!errorTitulo}
        helperText={errorTitulo}
      />
      <TextField
        label="Autor"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
        fullWidth
        margin="normal"
        required
        error={!!errorAutor}
        helperText={errorAutor}
      />
      <TextField
        label="ISBN"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
        fullWidth
        margin="normal"
        required
        error={!!errorIsbn}
        helperText={errorIsbn}
      />
      <TextField
        label="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        fullWidth
        margin="normal"
        required
        type="number"
        inputProps={{ step: "0.01" }}
        error={!!errorPrecio}
        helperText={errorPrecio}
      />

      {/* Display error message if any */}
      {errorGeneral && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {errorGeneral}
        </Typography>
      )}

      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={alCancelar} className="modalCancelButton">
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="contained"
          className="modalConfirmButton"
        >
          Agregar Libro
        </Button>
      </Box>
    </Box>
  );
}
// Remember to import Typography if you use it for the error message
// import { TextField, Button, Box, Typography } from '@mui/material';
