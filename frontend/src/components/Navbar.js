// src/components/Navbar.js
"use client";

import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import styles from '@/app/page.module.css'; // Reutilizamos los estilos del header

export default function Navbar() {
    return (
    <AppBar position="static" className={styles.appBar}>
        <Toolbar>
        {/* Título que es un enlace a la página de inicio */}
        <Typography variant="h6" component={Link} href="/" sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
            Biblioteca San Martín
        </Typography>

        {/* Contenedor para los botones de navegación */}
        <Box>
            <Button color="inherit" component={Link} href="/">
                Inicio
            </Button>
            <Button color="inherit" component={Link} href="/catalogo">
                Catálogo
            </Button>
            <Button color="inherit" component={Link} href="/prestamos">
                Préstamos
            </Button>
        </Box>
        </Toolbar>
    </AppBar>
    );
}