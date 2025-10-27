// src/app/socios/page.js
"use client";
import React from "react";
import { Container, Typography } from "@mui/material";
import ListaSocios from "@/components/ListaSocios"; // Importaremos el nuevo componente
import ProtectedRoute from '@/components/ProtectedRoute';

export default function SociosPage() {
  return (
    <ProtectedRoute>
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom className="title">
          Listado de Socios
        </Typography>
        <ListaSocios />
      </Container>
    </ProtectedRoute>
  );
}
