// src/components/FormularioNuevoLibro.js
"use client";
import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

export default function FormularioNuevoLibro({ alAgregar, alCancelar }) {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [precio, setPrecio] = useState("");
  const [error, setError] = useState(""); // State to hold error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Basic validation (optional, can add more specific checks)
    if (!titulo || !autor || !isbn || !precio) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (isNaN(parseFloat(precio)) || parseFloat(precio) < 0) {
      setError("El precio debe ser un número válido.");
      return;
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

      const data = await response.json(); // Always try to parse the response

      if (!response.ok) {
        // Use the error message from the backend if available
        throw new Error(data.mensaje || "Error al guardar el libro.");
      }

      alAgregar(data); // Call the parent function with the new book data
    } catch (err) {
      console.error(err);
      setError(err.message); // Display the error message to the user
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
      />
      <TextField
        label="Autor"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="ISBN"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
        fullWidth
        margin="normal"
        required
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
      />

      {/* Display error message if any */}
      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}

      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={alCancelar} className="modalCancelButton">
          Cancelar
        </Button>
        <Button type="submit" variant="contained" className="modalConfirmButton">
          Agregar Libro
        </Button>
      </Box>
    </Box>
  );
}
// Remember to import Typography if you use it for the error message
// import { TextField, Button, Box, Typography } from '@mui/material';
