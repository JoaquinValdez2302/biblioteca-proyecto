// src/app/login/page.js
"use client"; // Esta página interactuará con el usuario
import React from "react";
import { Container, Typography, Box } from "@mui/material";
import LoginForm from "@/components/LoginForm"; // Importaremos el formulario
import ProtectedRoute from '@/components/ProtectedRoute';

export default function LoginPage() {
  return (
      <Container component="main" maxWidth="xs">
        {" "}
        {/* maxWidth="xs" para un formulario centrado y estrecho */}
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          {/* Aquí irá el formulario */}
          <LoginForm />
        </Box>
      </Container>
  );
}
