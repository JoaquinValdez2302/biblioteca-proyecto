// src/app/page.js
"use client";
import React, { useState, useEffect } from "react";
// Asegúrate de importar todos los componentes necesarios
import {
  Container,
  Typography,
  Box,
  Snackbar,
  Alert,
  Grid,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import EstadisticasClave from "@/components/EstadisticasClave";
import WidgetNuevosSocios from "@/components/WidgetNuevosSocios";
import WidgetNuevosLibros from "@/components/WidgetNuevosLibros";
import widgetStyles from "@/styles/DashboardWidget.module.css";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function HomePage() {
  const [notificacion, setNotificacion] = useState({
    abierto: false,
    mensaje: "",
    severidad: "success",
  });
  const [vencenHoy, setVencenHoy] = useState([]);
  const [ultimasDevoluciones, setUltimasDevoluciones] = useState([]);

  // Funciones para manejar notificaciones
  const handleSocioAgregado = (socio) => {
    setNotificacion({
      abierto: true,
      mensaje: `Socio ${socio.nombre_completo} agregado con éxito`,
      severidad: "success",
    });
  };
  const handleLibroAgregado = (libro) => {
    setNotificacion({
      abierto: true,
      mensaje: `Libro "${libro.titulo}" agregado con éxito`,
      severidad: "success",
    });
  };
  const handleCerrarNotificacion = (event, reason) => {
    if (reason === "clickaway") return;
    setNotificacion({ ...notificacion, abierto: false });
  };

  // useEffect para cargar datos de alertas
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

    // Fetch para préstamos que vencen hoy
    fetch(`${apiUrl}/api/reportes/vencen-hoy`, {
      // 2. Usar apiUrl aquí
      credentials: "include", // 3. Añadir credentials
    })
      .then((res) => res.json())
      .then((data) => setVencenHoy(data));
    fetch(`${apiUrl}/api/reportes/ultimas-devoluciones`, {
      // 2. Usar apiUrl aquí
      credentials: "include", // 3. Añadir credentials
    })
      .then((res) => res.json())
      .then((data) => setUltimasDevoluciones(data));
  }, []);

  return (
    <ProtectedRoute>
      <Container sx={{ marginTop: 4 }}>
        <EstadisticasClave />

        <div className={widgetStyles.widgetGrid} style={{ margin: "32px 0" }}>
          {/* Widget 1: Vencen Hoy */}
          <Paper elevation={2} className={widgetStyles.widgetCard}>
            <Typography variant="h6" className={widgetStyles.widgetTitle}>
              Préstamos que Vencen Hoy
            </Typography>
            <Divider sx={{ mb: 1 }} />
            {vencenHoy.length > 0 ? (
              <List dense className={widgetStyles.widgetList}>
                {/* CORREGIR ESTE BLOQUE */}
                {vencenHoy.map((p, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={p.titulo}
                      secondary={`Socio: ${p.nombre_completo}`}
                    />
                  </ListItem>
                ))}
                {/* FIN DEL BLOQUE CORREGIDO */}
              </List>
            ) : (
              <Typography sx={{ mt: 2, fontStyle: "italic" }}>
                No hay vencimientos para hoy.
              </Typography>
            )}
          </Paper>

          {/* Widget 2: Últimas Devoluciones */}
          <Paper elevation={2} className={widgetStyles.widgetCard}>
            <Typography variant="h6" className={widgetStyles.widgetTitle}>
              Últimas Devoluciones
            </Typography>
            <Divider sx={{ mb: 1 }} />
            {ultimasDevoluciones.length > 0 ? (
              <List dense className={widgetStyles.widgetList}>
                {/* CORREGIR ESTE BLOQUE */}
                {ultimasDevoluciones.map((d, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={d.titulo}
                      secondary={`Devuelto el: ${new Date(
                        d.fecha_devolucion
                      ).toLocaleDateString()}`}
                    />
                  </ListItem>
                ))}
                {/* FIN DEL BLOQUE CORREGIDO */}
              </List>
            ) : (
              <Typography sx={{ mt: 2, fontStyle: "italic" }}>
                No se han registrado devoluciones recientes.
              </Typography>
            )}
          </Paper>

          {/* Widget 3: Nuevos Socios */}
          <WidgetNuevosSocios onSocioAgregado={handleSocioAgregado} />

          {/* Widget 4: Nuevos Libros */}
          <WidgetNuevosLibros onLibroAgregado={handleLibroAgregado} />
        </div>
        <Snackbar
          open={notificacion.abierto}
          autoHideDuration={6000}
          onClose={handleCerrarNotificacion}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCerrarNotificacion}
            severity={notificacion.severidad}
            sx={{ width: "100%" }}
          >
            {notificacion.mensaje}
          </Alert>
        </Snackbar>
      </Container>
    </ProtectedRoute>
  );
}
