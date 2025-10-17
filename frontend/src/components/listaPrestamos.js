// frontend/src/components/ListaPrestamos.js
"use client";
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Switch, FormControlLabel } from '@mui/material';

export default function ListaPrestamos() {
    const [prestamos, setPrestamos] = useState([]);
    const [mostrarAtrasados, setMostrarAtrasados] = useState(false);
    
    useEffect(() => {
    let url = 'http://localhost:3001/api/prestamos/vigentes';
    if (mostrarAtrasados) {
        url += '?atrasados=true';
    }
    fetch(url)
        .then(res => res.json())
        .then(data => setPrestamos(data));
    }, [mostrarAtrasados]); // Se ejecuta cada vez que cambia el filtro

    const calcularDiasDeAtraso = (fechaVencimiento) => {
    const hoy = new Date();
    const vencimiento = new Date(fechaVencimiento);
    if (hoy <= vencimiento) return 0;
    const diffTiempo = hoy.getTime() - vencimiento.getTime();
      return Math.floor(diffTiempo / (1000 * 3600 * 24));
    };

    return (
    <Paper>
        <FormControlLabel
        control={<Switch checked={mostrarAtrasados} onChange={(e) => setMostrarAtrasados(e.target.checked)} />}
        label="Mostrar solo préstamos atrasados"
        sx={{ padding: 2 }}
        />
        <TableContainer>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>Libro</TableCell>
                <TableCell>Socio</TableCell>
                <TableCell>N° de Socio</TableCell>
                <TableCell>Fecha de Préstamo</TableCell>
                <TableCell>Fecha de Vencimiento</TableCell>
                {mostrarAtrasados && <TableCell>Días de Atraso</TableCell>}
            </TableRow>
            </TableHead>
            <TableBody>
            {prestamos.map((p) => (
                <TableRow key={p.prestamo_id}>
                <TableCell>{p.libro_titulo}</TableCell>
                <TableCell>{p.socio_nombre}</TableCell>
                <TableCell>{p.numero_de_socio}</TableCell>
                <TableCell>{new Date(p.fecha_inicio).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(p.fecha_vencimiento).toLocaleDateString()}</TableCell>
                {mostrarAtrasados && (
                    <TableCell sx={{ color: 'red', fontWeight: 'bold' }}>
                    {calcularDiasDeAtraso(p.fecha_vencimiento)}
                    </TableCell>
                )}
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </Paper>
    );
}   