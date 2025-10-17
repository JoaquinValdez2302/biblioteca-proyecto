"use client";
import React from 'react';
import { Container, Typography } from '@mui/material';
import CatalogoLibros from '@/components/CatalogoLibros';
import styles from './page.module.css';

export default function CatalogoPage() {
  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" className={styles.title}>
        Catálogo de Libros
      </Typography>
      <CatalogoLibros />
    </Container>
  );
}