"use client";
import React from "react";
import { Container, Typography } from "@mui/material";
import CatalogoLibros from "@/components/CatalogoLibros";
import ProtectedRoute from '@/components/ProtectedRoute';


export default function CatalogoPage() {
  return (
    <ProtectedRoute>
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" className="title">
          Catálogo de Libros
        </Typography>
        <CatalogoLibros />
      </Container>
    </ProtectedRoute>
  );
}
