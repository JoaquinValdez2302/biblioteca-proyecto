// frontend/src/app/prestamos/page.js
"use client";
import React from "react";
import { Container, Typography } from "@mui/material";
import ListaPrestamos from "@/components/listaPrestamos";
import ProtectedRoute from '@/components/ProtectedRoute';

export default function PrestamosPage() {
  return (
    <ProtectedRoute>
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom className="title">
          Gestión de Préstamos Vigentes
        </Typography>
        <ListaPrestamos />
      </Container>
    </ProtectedRoute>
  );
}
