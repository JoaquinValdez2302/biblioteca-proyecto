// src/components/ListaSocios.js
"use client";
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Box } from '@mui/material';
import tableStyles from '@/styles/TableStyles.module.css';
import PaginacionTabla from './PaginacionTabla';

export default function ListaSocios() {
  const [socios, setSocios] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [pagina, setPagina] = useState(1);
  const [totalSocios, setTotalSocios] = useState(0);
  const itemsPorPagina = 10;

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

    // 2. Construir la URL completa usando apiUrl
    const url = new URL(`${apiUrl}/api/socios`);
    url.searchParams.append('pagina', pagina);
    url.searchParams.append('porPagina', itemsPorPagina);
    if (busqueda) {
      url.searchParams.append('busqueda', busqueda);
    }
    fetch(url, {credentials: 'include'})
      .then(res => res.json())
      .then(data => {
        console.log('Datos recibidos del backend:', data);
        setSocios(data.socios);
        setTotalSocios(data.total);
      })
      .catch(error => console.error("Error al cargar socios:", error));
  }, [busqueda, pagina]);

  const handlePageChange = (nuevaPagina) => {
    setPagina(nuevaPagina);
  };

  // Definición de la función para verificar sanción
  const estaSancionado = (fechaSancion) => {
    if (!fechaSancion) return false;
    return new Date(fechaSancion) > new Date();
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Buscar por N° Socio, Nombre o DNI"
          variant="outlined"
          size="small"
          fullWidth
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setPagina(1);
          }}
        />
      </Box>

      <TableContainer>
        <Table>
          <TableHead className={tableStyles.tableHeader}>
            {/* Asegúrate de que este encabezado esté completo */}
            <TableRow>
              <TableCell>N° Socio</TableCell>
              <TableCell>Nombre Completo</TableCell>
              <TableCell>DNI</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Verificar si socios es un array antes de mapear */}
            {Array.isArray(socios) && socios.map((socio, index) => (
              <TableRow
                key={socio.socio_id}
                className={`
                  ${tableStyles.tableRow}
                  ${index % 2 !== 0 ? tableStyles.tableRowAlternate : ''}
                `}
              >
                {/* --- AÑADIR ESTAS CELDAS --- */}
                <TableCell>{socio.numero_de_socio}</TableCell>
                <TableCell>{socio.nombre_completo}</TableCell>
                <TableCell>{socio.dni}</TableCell>
                <TableCell>{socio.email || '-'}</TableCell>
                <TableCell>{socio.telefono || '-'}</TableCell>
                <TableCell>
                  {estaSancionado(socio.sancionado_hasta) ? (
                    <Typography color="error" variant="caption">
                      Suspendido hasta {new Date(socio.sancionado_hasta).toLocaleDateString()}
                    </Typography>
                  ) : (
                    <Typography color="success.main" variant="caption">Activo</Typography>
                  )}
                </TableCell>
                {/* --- FIN DE LAS CELDAS --- */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <PaginacionTabla
        paginaActual={pagina}
        totalItems={totalSocios}
        itemsPorPagina={itemsPorPagina}
        onPageChange={handlePageChange}
      />
    </Paper>
  );
}