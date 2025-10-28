// src/components/DashboardAlertas.js
"use client";
import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
// 1. Importar el nuevo archivo de estilos unificado
import styles from "@/styles/DashboardWidget.module.css";

export default function DashboardAlertas() {
  const [vencenHoy, setVencenHoy] = useState([]);
  const [ultimasDevoluciones, setUltimasDevoluciones] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/api/reportes/vencen-hoy`, {
      // 2. Usar apiUrl aquí
      credentials: "include", // 3. Añadir credentials
    })
      .thefen((res) => res.json())
      .then((data) => setVencenHoy(data))
      .catch((error) =>
        console.error("Error al cargar préstamos que vencen hoy:", error)
      );

    fetch(`${apiUrl}/api/reportes/ultimas-devoluciones`, {
      // 2. Usar apiUrl aquí
      credentials: "include", // 3. Añadir credentials
    })
      .then((res) => res.json())
      .then((data) => setUltimasDevoluciones(data))
      .catch((error) =>
        console.error("Error al cargar últimas devoluciones:", error)
      );
  }, []);

  return (
    // 2. Usar el contenedor Grid del archivo de estilos
    <div className={styles.widgetGrid}>
      {/* Tarjeta para Vencimientos del Día */}
      {/* 3. Aplicar la clase de tarjeta unificada */}
      <Paper elevation={2} className={styles.widgetCard}>
        {/* 4. Aplicar clase al título */}
        <Typography variant="h6" className={styles.widgetTitle}>
          Préstamos que Vencen Hoy
        </Typography>
        <Divider sx={{ mb: 1 }} />
        {vencenHoy.length > 0 ? (
          // 5. Aplicar clase a la lista
          <List dense className={styles.widgetList}>
            {vencenHoy.map((p, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={p.titulo}
                  secondary={`Socio: ${p.nombre_completo}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography sx={{ mt: 2, fontStyle: "italic" }}>
            No hay vencimientos para hoy.
          </Typography>
        )}
      </Paper>

      {/* Tarjeta para Últimas Devoluciones */}
      {/* 3. Aplicar la clase de tarjeta unificada */}
      <Paper elevation={2} className={styles.widgetCard}>
        {/* 4. Aplicar clase al título */}
        <Typography variant="h6" className={styles.widgetTitle}>
          Últimas Devoluciones Registradas
        </Typography>
        <Divider sx={{ mb: 1 }} />
        {ultimasDevoluciones.length > 0 ? (
          // 5. Aplicar clase a la lista
          <List dense className={styles.widgetList}>
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
          </List>
        ) : (
          <Typography sx={{ mt: 2, fontStyle: "italic" }}>
            No se han registrado devoluciones recientes.
          </Typography>
        )}
      </Paper>
    </div>
  );
}
