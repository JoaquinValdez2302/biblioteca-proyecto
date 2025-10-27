// src/components/PaginacionTabla.js
"use client";
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import styles from "@/styles/TableStyles.module.css"; // Usa el estilo unificado

export default function PaginacionTabla({
  paginaActual,
  totalItems,
  itemsPorPagina = 10,
  onPageChange,
}) {
  const totalPaginas = Math.ceil(totalItems / itemsPorPagina);

  const handlePrevious = () => {
    if (paginaActual > 1) {
      onPageChange(paginaActual - 1);
    }
  };

  const handleNext = () => {
    if (paginaActual < totalPaginas) {
      onPageChange(paginaActual + 1);
    }
  };

  if (totalPaginas <= 1) return null; // No mostrar paginación si hay 1 página o menos

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        mt: 2,
      }}
    >
      <button
        onClick={handlePrevious}
        disabled={paginaActual === 1}
        className={styles.paginationButton} // Reutiliza estilo de botón
      >
        Anterior
      </button>
      <Typography component="span" sx={{ mx: 2 }}>
        Página {paginaActual} de {totalPaginas}
      </Typography>
      <button
        onClick={handleNext}
        disabled={paginaActual === totalPaginas}
        className={styles.paginationButton} // Reutiliza estilo de botón
      >
        Siguiente
      </button>
    </Box>
  );
}
