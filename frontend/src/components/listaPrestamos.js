"use client";
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Switch, Dialog, DialogTitle, DialogContent, DialogActions, Button,
    FormControlLabel, Typography, FormControl, RadioGroup, FormLabel, Radio } from '@mui/material';
import styles from './ListaPrestamos.module.css';

export default function ListaPrestamos() {
    const [prestamos, setPrestamos] = useState([]);
    const [mostrarAtrasados, setMostrarAtrasados] = useState(false);
    const [modalDevolucionAbierto, setModalDevolucionAbierto] = useState(false);
    const [prestamoSeleccionado, setPrestamoSeleccionado] = useState(null);
    const [nivelDeDaño, setNivelDeDaño] = useState('sin_daños'); // Opciones: 'sin_daños', 'leve', 'moderado', 'grave'
    const [notificacion, setNotificacion] = useState({ abierto: false, mensaje: '', severidad: 'success' });

    useEffect(() => {
    let url = 'http://localhost:3001/api/prestamos/vigentes';
    if (mostrarAtrasados) {
        url += '?atrasados=true';
    }
    fetch(url)
        .then(res => res.json())
        .then(data => setPrestamos(data));
    }, [mostrarAtrasados]);

    const handleAbrirModalDevolucion = (prestamo) => {
    setPrestamoSeleccionado(prestamo);
    setModalDevolucionAbierto(true);
};

const handleCerrarModalDevolucion = () => {
    setModalDevolucionAbierto(false);
    setNivelDeDaño('sin_daños'); // Reiniciamos el estado del daño
    setPrestamoSeleccionado(null);
};

const handleConfirmarDevolucion = async () => {
    if (!prestamoSeleccionado) return;

    const estaDañado = nivelDeDaño !== 'sin_daños';

    try {
    const response = await fetch(`http://localhost:3001/api/prestamos/${prestamoSeleccionado.prestamo_id}/devolver`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estaDañado, nivelDeDaño }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.mensaje || 'Error al procesar la devolución.');
    }

    // Quitamos el préstamo devuelto de la lista del frontend
    setPrestamos(prestamos.filter(p => p.prestamo_id !== prestamoSeleccionado.prestamo_id));
    setNotificacion({ abierto: true, mensaje: '¡Devolución registrada con éxito!', severidad: 'success' });

    } catch (error) {
    setNotificacion({ abierto: true, mensaje: error.message, severidad: 'error' });
    } finally {
        handleCerrarModalDevolucion();
    }
};
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
          {/* 2. Aplicar el estilo al encabezado de la tabla */}
            <TableHead className={styles.tableHeader}>
            <TableRow>
                <TableCell>Libro</TableCell>
                <TableCell>Socio</TableCell>
                <TableCell>N° de Socio</TableCell>
                <TableCell>Fecha de Préstamo</TableCell>
                <TableCell>Fecha de Vencimiento</TableCell>
                {mostrarAtrasados && <TableCell>Días de Atraso</TableCell>}
                <TableCell align="right">Acciones</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {Array.isArray(prestamos) && prestamos.map((p, index) => {
              // 3. Calcular si el préstamo está atrasado ANTES de renderizar la fila
                const diasDeAtraso = calcularDiasDeAtraso(p.fecha_vencimiento);
                const estaAtrasado = diasDeAtraso > 0;

                return (
                // 4. Aplicar las clases de estilo a cada fila dinámicamente
                <TableRow 
                    key={p.prestamo_id}
                    className={`
                    ${styles.tableRow} 
                    ${index % 2 !== 0 ? styles.tableRowAlternate : ''}
                    ${estaAtrasado ? styles.tableRowOverdue : ''}
                    `}
                >
                    <TableCell>{p.libro_titulo}</TableCell>
                    <TableCell>{p.socio_nombre}</TableCell>
                    <TableCell>{p.numero_de_socio}</TableCell>
                    <TableCell>{new Date(p.fecha_inicio).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(p.fecha_vencimiento).toLocaleDateString()}</TableCell>
                    {mostrarAtrasados && (
                    <TableCell sx={{ fontWeight: 'bold' }}>
                        {diasDeAtraso}
                    </TableCell>
                    )}
                    <TableCell align="right">
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleAbrirModalDevolucion(p)}
                    >
                    Devolver
                    </Button>
                </TableCell>
                </TableRow>
                );
            })}
            </TableBody>
            </Table>
        </TableContainer>
        {/* --- MODAL DE DEVOLUCIÓN --- */}
    <Dialog open={modalDevolucionAbierto} onClose={handleCerrarModalDevolucion}>
    <DialogTitle>Registrar Devolución</DialogTitle>
    <DialogContent>
        <Typography>
        Estás registrando la devolución del libro: <strong>{prestamoSeleccionado?.libro_titulo}</strong>
        </Typography>
        <FormControl sx={{ mt: 2 }}>
        <FormLabel>Estado del libro al ser devuelto:</FormLabel>
        <RadioGroup
            value={nivelDeDaño}
            onChange={(e) => setNivelDeDaño(e.target.value)}
        >
            <FormControlLabel value="sin_daños" control={<Radio />} label="En buenas condiciones" />
            <FormControlLabel value="leve" control={<Radio />} label="Daño Leve" />
            <FormControlLabel value="moderado" control={<Radio />} label="Daño Moderado" />
            <FormControlLabel value="grave" control={<Radio />} label="Daño Grave (Inutilizable)" />
        </RadioGroup>
        </FormControl>
    </DialogContent>
    <DialogActions>
        <Button onClick={handleCerrarModalDevolucion}>Cancelar</Button>
        <Button onClick={handleConfirmarDevolucion} variant="contained">
        Confirmar
        </Button>
    </DialogActions>
    </Dialog>
    </Paper>
    );
}