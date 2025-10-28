// src/app/login/page.js
"use client"; // Esta página interactuará con el usuario
import React from "react";
import { Container, Typography, Box, Paper } from "@mui/material";
import LoginForm from "@/components/LoginForm"; // Importaremos el formulario
import styles from './page.module.css';


export default function LoginPage() {
  return (
      <Container component="main" maxWidth="xs">
        {" "}
        {/* maxWidth="xs" para un formulario centrado y estrecho */}
        <Box
          className={styles.loginContainer}
        >
            <Paper elevation={0} className={styles.loginCard}> 
          <Typography component="h1" variant="h5" className={styles.loginTitle}>
            Iniciar Sesión
          </Typography>
          {/* Aquí irá el formulario */}
          <LoginForm />
          </Paper>
        </Box>
      </Container>
  );
}
