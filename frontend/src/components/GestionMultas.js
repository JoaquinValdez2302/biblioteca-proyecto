// src/components/GestionMultas.js
"use client";
import React, { useState, useEffect } from "react";
import {
  Paper,
  TextField,
  Switch,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
} from "@mui/material";
// 1. Asegurarse de que la importación del estilo unificado sea correcta
import tableStyles from "@/styles/TableStyles.module.css";

export default function GestionMultas() {
  const [multas, setMultas] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("pendiente"); // 'pendiente' o 'pagada'

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const url = new URL(`${apiUrl}/api/multas`);
    url.searchParams.append("estado", filtroEstado);
    if (filtroNombre) {
      url.searchParams.append("nombre", filtroNombre);
    }

    fetch(url, {credentials: 'include'})
      .then((res) => res.json())
      .then((data) => setMultas(data));
  }, [filtroNombre, filtroEstado]);

  const handleRegistrarPago = async (multaId) => {
    if (!confirm("¿Confirmas que esta multa ha sido pagada?")) return;

    await fetch(`http://localhost:3001/api/multas/${multaId}/pagar`, {
      method: "PATCH",
    });
    setMultas(multas.filter((m) => m.multa_id !== multaId));
    // Aquí podrías añadir una notificación de éxito
  };

  return (
    <Paper sx={{ p: 2 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <TextField
          label="Buscar por nombre de socio"
          size="small"
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
        />
        <FormControlLabel
          control={
            <Switch
              checked={filtroEstado === "pagada"}
              onChange={(e) =>
                setFiltroEstado(e.target.checked ? "pagada" : "pendiente")
              }
            />
          }
          label="Mostrar multas pagadas"
        />
      </div>
      <TableContainer>
        <Table>
          {/* 2. Aplicar la clase de estilo al encabezado */}
          <TableHead className={tableStyles.tableHeader}>
            <TableRow>
              <TableCell>Socio</TableCell>
              <TableCell>Motivo</TableCell>
              <TableCell>Monto</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(multas) &&
              multas.map(
                (
                  multa,
                  index // 3. Asegurarse de recibir el 'index'
                ) => (
                  // 4. Aplicar las clases dinámicas a la fila
                  <TableRow
                    key={multa.multa_id}
                    className={`
                  ${tableStyles.tableRow} 
                  ${index % 2 !== 0 ? tableStyles.tableRowAlternate : ""}
                `}
                  >
                    <TableCell>{multa.nombre_completo}</TableCell>
                    <TableCell>{multa.motivo}</TableCell>
                    <TableCell>${multa.monto}</TableCell>
                    <TableCell>
                      {new Date(multa.fecha_emision).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {filtroEstado === "pendiente" && (
                        <Button
                          className={tableStyles.actionButton} // Clase unificada
                          size="small"
                          // Quitamos las líneas 'disabled' y 'onClick' que usan 'libro'
                          onClick={() => handleRegistrarPago(multa.multa_id)}
                        >
                          Registrar Pago
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                )
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
