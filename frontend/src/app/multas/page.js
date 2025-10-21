"use client";
import React from 'react';
import { Container, Typography } from '@mui/material';
import GestionMultas from '@/components/GestionMultas';

export default function MultasPage() {
    return (
    <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
        Centro de Gestión de Cobros
        </Typography>
        <GestionMultas />
    </Container>
    );
}