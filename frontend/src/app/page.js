// src/app/page.js
"use client";

import React from 'react';
import { Container, Typography, Box,} from '@mui/material';
import EstadisticasClave from '@/components/EstadisticasClave';
import DashboardAlertas from '@/components/DashboardAlertas';


export default function HomePage() {
  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        <EstadisticasClave />
      <Box sx={{ my: 4 }}>
        <DashboardAlertas />
      </Box>
        ¡Bienvenido al Sistema de Gestión!
      </Typography>
      <Typography variant="body1">
        Seleccioná una opción en la barra de navegación para comenzar.
      </Typography>
    </Container>
  );
}