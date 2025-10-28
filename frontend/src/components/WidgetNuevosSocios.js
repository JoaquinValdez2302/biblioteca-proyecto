// src/components/WidgetNuevosSocios.js
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
import FormularioNuevoSocio from "./FormularioNuevoSocio";
// 1. Importar el estilo unificado
import styles from "@/styles/DashboardWidget.module.css";

export default function WidgetNuevosSocios({ onSocioAgregado }) {
  const [ultimosSocios, setUltimosSocios] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);

  const cargarUltimosSocios = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    fetch(`${apiUrl}/api/socios/ultimos`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUltimosSocios(data))
      .catch((error) =>
        console.error("Error al cargar últimos socios:", error)
      );
  };

  useEffect(() => {
    cargarUltimosSocios();
  }, []);

  const handleSocioAgregadoLocal = (socio) => {
    setModalAbierto(false);
    onSocioAgregado(socio);
    cargarUltimosSocios();
  };

  return (
    // 2. Aplicar la clase unificada a Paper
    <Paper elevation={3} className={styles.widgetCard}>
      {/* 3. Aplicar la clase unificada al título */}
      <Typography variant="h6" gutterBottom className={styles.widgetTitle}>
        Nuevos Socios
      </Typography>
      <Button
        variant="contained"
        onClick={() => setModalAbierto(true)}
        sx={{
          mb: 2,
          backgroundColor: "#C19A6B", // Tu color secundario
          "&:hover": {
            backgroundColor: "#a5752b", // Tono más oscuro para hover
          },
        }}
      >
        Agregar Socio
      </Button>
      <Divider sx={{ mb: 1 }} />
      <Typography variant="caption" display="block" gutterBottom>
        Últimos agregados:
      </Typography>
      {ultimosSocios.length > 0 ? (
        // 4. Aplicar la clase unificada a la lista
        <List dense className={styles.widgetList}>
          {ultimosSocios.map((socio) => (
            <ListItem key={socio.socio_id}>
              <ListItemText
                primary={socio.nombre_completo}
                secondary={`N°: ${socio.numero_de_socio}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2" sx={{ fontStyle: "italic", mt: 1 }}>
          No hay socios recientes.
        </Typography>
      )}

      {/* El modal no necesita cambios de estilo */}
      <Dialog open={modalAbierto} onClose={() => setModalAbierto(false)}>
        <DialogTitle className="modalTitle">Agregar Nuevo Socio</DialogTitle>
        <DialogContent className="modalContent">
          {/* --- ASEGURATE DE QUE ESTA LÍNEA ESTÉ AQUÍ --- */}
          <FormularioNuevoSocio
            alAgregar={handleSocioAgregadoLocal}
            alCancelar={() => setModalAbierto(false)}
          />
          {/* ------------------------------------------- */}
        </DialogContent>
      </Dialog>
    </Paper>
  );
}
