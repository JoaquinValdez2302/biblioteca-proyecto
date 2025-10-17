// src/app/page.js
"use client";

import React from 'react';
import { Container, Typography } from '@mui/material';

export default function HomePage() {
  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        ¡Bienvenido al Sistema de Gestión!
      </Typography>
      <Typography variant="body1">
        Seleccioná una opción en la barra de navegación para comenzar.
      </Typography>
    </Container>
  );
}