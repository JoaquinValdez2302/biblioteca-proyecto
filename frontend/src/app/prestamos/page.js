// frontend/src/app/prestamos/page.js
"use client";
import React from 'react';
import { Container, Typography } from '@mui/material';
import ListaPrestamos from '@/components/ListaPrestamos';

export default function PrestamosPage() {
    return (
        <Container sx={{ marginTop: 4 }}>
            <Typography variant="h4" gutterBottom>
            Gestión de Préstamos Vigentes
            </Typography>
            <ListaPrestamos />
        </Container>
        );
}