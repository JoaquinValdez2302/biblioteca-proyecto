// src/app/page.js
"use client";

import React, { useState } from 'react';
import { Container, Typography, Box, Button, Dialog, DialogTitle, DialogContent, Snackbar, Alert, handleCerrarNotificacion} from '@mui/material';
import EstadisticasClave from '@/components/EstadisticasClave';
import DashboardAlertas from '@/components/DashboardAlertas';
import FormularioNuevoSocio from '@/components/FormularioNuevoSocio';
import FormularioNuevoLibro from '@/components/FormularioNuevoLibro';


export default function HomePage() {
  const [modalSocioAbierto, setModalSocioAbierto] = useState(false);
  const [modalLibroAbierto, setModalLibroAbierto] = useState(false);
  const [notificacion, setNotificacion] = useState({ abierto: false, mensaje: '', severidad: 'success' }); // Para feedback

  const handleSocioAgregado = (socio) => {
    setModalSocioAbierto(false);
    setNotificacion({ abierto: true, mensaje: `Socio ${socio.nombre_completo} agregado con éxito`, severidad: 'success' });
    // Podrías recargar estadísticas aquí si fuera necesario
  };

  const handleLibroAgregado = (libro) => {
    setModalLibroAbierto(false);
    setNotificacion({ abierto: true, mensaje: `Libro "${libro.titulo}" agregado con éxito`, severidad: 'success' });
    // Podrías recargar estadísticas aquí
  };
  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        <EstadisticasClave />
        <Box sx={{ my: 4 }}>
          <DashboardAlertas />
        </Box>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', my: 4 }}>
          <Button variant="contained" onClick={() => setModalSocioAbierto(true)}>
            Agregar Nuevo Socio
          </Button>
          <Button variant="contained" onClick={() => setModalLibroAbierto(true)}>
            Agregar Nuevo Libro
          </Button>
        </Box>
        ¡Bienvenido al Sistema de Gestión!
      </Typography>
      <Typography variant="body1">
        Seleccioná una opción en la barra de navegación para comenzar.
      </Typography>
      <Dialog open={modalSocioAbierto} onClose={() => setModalSocioAbierto(false)}>
        <DialogTitle>Agregar Nuevo Socio</DialogTitle>
        <DialogContent>
          <FormularioNuevoSocio
            alAgregar={handleSocioAgregado}
            alCancelar={() => setModalSocioAbierto(false)}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={modalLibroAbierto} onClose={() => setModalLibroAbierto(false)}>
        <DialogTitle>Agregar Nuevo Libro</DialogTitle>
        <DialogContent>
          {/* Renderizamos el formulario de libro dentro del modal */}
          <FormularioNuevoLibro
            alAgregar={handleLibroAgregado}
            alCancelar={() => setModalLibroAbierto(false)}
          />
        </DialogContent>
      </Dialog>
      <Snackbar
        open={notificacion.abierto}
        autoHideDuration={6000} // Se cierra automáticamente después de 6 segundos
        onClose={handleCerrarNotificacion}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Posición
      >
        {/* Usamos Alert para darle estilo según la severidad */}
        <Alert
          onClose={handleCerrarNotificacion}
          severity={notificacion.severidad}
          sx={{ width: '100%' }}
        >
          {notificacion.mensaje}
        </Alert>
      </Snackbar>
    </Container>
  );
}