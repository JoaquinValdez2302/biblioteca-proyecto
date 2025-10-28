// src/components/Navbar.js
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import styles from "./Navbar.module.css"; // Reutilizamos los estilos del header
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { usuario, logout } = useAuth();

  return (
    <AppBar position="static" className={styles.appBar}>
      <Toolbar>
        {/* Título que es un enlace a la página de inicio */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <div className={styles.logoWrapper}>
            {/* Contenedor del logo (se mantiene igual) */}
            <div className={styles.logoContainer}>
              <Image
                src="/logo.png"
                alt="Logo de la Biblioteca San Martín"
                fill
                className={styles.logoImage}
                priority
              />
            </div>
            {/* Texto añadido al lado del logo */}
            <Typography component="span" className={styles.logoText}>
              Biblioteca San Martín
            </Typography>
          </div>
          <Box sx={{ flexGrow: 1 }} />
        </Link>
        {/* Contenedor para los botones de navegación */}
        <Box sx={{ marginLeft: "auto" }}>
          <Button color="inherit" component={Link} href="/">
            Inicio
          </Button>
          <Button color="inherit" component={Link} href="/catalogo">
            Catálogo
          </Button>
          <Button color="inherit" component={Link} href="/prestamos">
            Préstamos
          </Button>
          <Button color="inherit" component={Link} href="/multas">
            Multas
          </Button>
          <Button color="inherit" component={Link} href="/socios">
            Socios
          </Button>
        </Box>
        <Box sx={{ marginLeft: 2 }}>
          {" "}
          {/* Separador */}
          {usuario ? (
            // Si el usuario está logueado
            <>
              <Button color="inherit" onClick={logout} className="logOutButton">
                {" "}
                {/* Llama a la función logout del contexto */}
                Cerrar Sesión
              </Button>
            </>
          ) : (
            // Si el usuario NO está logueado
            <Button color="inherit" component={Link} href="/login" >
              Iniciar Sesión
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
