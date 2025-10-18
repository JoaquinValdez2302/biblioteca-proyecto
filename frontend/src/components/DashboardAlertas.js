"use client";
import React, { useState, useEffect } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Grid, Divider } from '@mui/material';

export default function DashboardAlertas() {
    const [vencenHoy, setVencenHoy] = useState([]);
    const [ultimasDevoluciones, setUltimasDevoluciones] = useState([]);

    useEffect(() => {
    // Fetch para préstamos que vencen hoy
    fetch('http://localhost:3001/api/reportes/vencen-hoy')
        .then(res => res.json())
        .then(data => setVencenHoy(data))
        .catch(error => console.error("Error al cargar préstamos que vencen hoy:", error));

    // Fetch para últimas devoluciones
    fetch('http://localhost:3001/api/reportes/ultimas-devoluciones')
        .then(res => res.json())
        .then(data => setUltimasDevoluciones(data))
        .catch(error => console.error("Error al cargar últimas devoluciones:", error));
    }, []);

    return (
    <Grid container spacing={3}>
      {/* Columna para Vencimientos del Día */}
        <Grid item xs={12} md={6}>
        <Paper elevation={2} sx={{ p: 2, backgroundColor: '#fffbe6' }}>
            <Typography variant="h6" gutterBottom>
            Préstamos que Vencen Hoy
            </Typography>
            <Divider />
            {vencenHoy.length > 0 ? (
            <List dense>
                {vencenHoy.map((p, index) => (
                <ListItem key={index}>
                    <ListItemText primary={p.titulo} secondary={`Socio: ${p.nombre_completo}`} />
                </ListItem>
                ))}
            </List>
            ) : (
            <Typography sx={{ mt: 2, fontStyle: 'italic' }}>No hay vencimientos para hoy.</Typography>
            )}
        </Paper>
        </Grid>

      {/* Columna para Últimas Devoluciones */}
        <Grid item xs={12} md={6}>
        <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
            Últimas Devoluciones Registradas
            </Typography>
            <Divider />
            {ultimasDevoluciones.length > 0 ? (
            <List dense>
                {ultimasDevoluciones.map((d, index) => (
                <ListItem key={index}>
                    <ListItemText primary={d.titulo} secondary={`Devuelto el: ${new Date(d.fecha_devolucion).toLocaleDateString()}`} />
                </ListItem>
                ))}
            </List>
            ) : (
            <Typography sx={{ mt: 2, fontStyle: 'italic' }}>No se han registrado devoluciones recientes.</Typography>
            )}
        </Paper>
        </Grid>
    </Grid>
    );
}