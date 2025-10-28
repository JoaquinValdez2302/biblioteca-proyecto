// src/components/WidgetNuevosLibros.js
"use client";
import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import FormularioNuevoLibro from "./FormularioNuevoLibro";
// 1. Importar el estilo unificado
import styles from "@/styles/DashboardWidget.module.css";

export default function WidgetNuevosLibros({ onLibroAgregado }) {
  const [ultimosLibros, setUltimosLibros] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);

  const cargarUltimosLibros = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    fetch(`${apiUrl}/api/libros/ultimos`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUltimosLibros(data))
      .catch((error) =>
        console.error("Error al cargar últimos libros:", error)
      );
  };

  useEffect(() => {
    cargarUltimosLibros();
  }, []);

  const handleLibroAgregadoLocal = (libro) => {
    setModalAbierto(false);
    onLibroAgregado(libro);
    cargarUltimosLibros();
  };

  return (
    // 2. Aplicar la clase unificada a Paper
    <Paper elevation={3} className={styles.widgetCard}>
      {/* 3. Aplicar la clase unificada al título */}
      <Typography variant="h6" gutterBottom className={styles.widgetTitle}>
        Nuevos Libros
      </Typography>
      <Button
        variant="contained"
        onClick={() => setModalAbierto(true)}
        sx={{ mb: 2 }}
      >
        Agregar Libro
      </Button>
      <Divider sx={{ mb: 1 }} />
      <Typography variant="caption" display="block" gutterBottom>
        Últimos agregados:
      </Typography>
      {ultimosLibros.length > 0 ? (
        // 4. Aplicar la clase unificada a la lista
        <List dense className={styles.widgetList}>
          {ultimosLibros.map((libro) => (
            <ListItem key={libro.libro_id}>
              <ListItemText
                primary={libro.titulo}
                secondary={`Autor: ${libro.autor}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2" sx={{ fontStyle: "italic", mt: 1 }}>
          No hay libros recientes.
        </Typography>
      )}

      {/* El modal no necesita cambios de estilo */}
      <Dialog open={modalAbierto} onClose={() => setModalAbierto(false)}>
        <DialogTitle>Agregar Nuevo Libro</DialogTitle>
        <DialogContent>
          {/* --- ASEGURATE DE QUE ESTA LÍNEA ESTÉ AQUÍ --- */}
          <FormularioNuevoLibro
            alAgregar={handleLibroAgregadoLocal}
            alCancelar={() => setModalAbierto(false)}
          />
          {/* ------------------------------------------- */}
        </DialogContent>
      </Dialog>
    </Paper>
  );
}
