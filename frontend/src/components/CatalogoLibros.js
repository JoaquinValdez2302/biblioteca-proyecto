"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import tableStyles from "@/styles/TableStyles.module.css";
import styles from "./CatalogoLibros.module.css";
// ... tus importaciones existentes ...

export default function CatalogoLibros() {
  const [libros, setLibros] = useState([]);

  // --- NUEVOS ESTADOS ---
  const [modalAbierto, setModalAbierto] = useState(false); // Para controlar si el modal se muestra
  const [libroSeleccionado, setLibroSeleccionado] = useState(null); // Para saber qué libro prestar
  const [numeroDeSocio, setNumeroDeSocio] = useState(""); // Para guardar el número de socio del input
  const [notificacion, setNotificacion] = useState({
    abierto: false,
    mensaje: "",
    severidad: "success",
  }); // Para las notificaciones
  const [busqueda, setBusqueda] = useState(""); // Para el input de búsqueda
  const [pagina, setPagina] = useState(1); // Para la página actual
  // -----------------------
  // Estado para guardar la lista de libros

  // useEffect se ejecuta para buscar los datos cuando el componente se carga
  useEffect(() => {
    // Construimos la URL con los parámetros de búsqueda y paginación
    const url = new URL("http://localhost:3001/api/libros");
    if (busqueda) {
      url.searchParams.append("busqueda", busqueda);
    }
    url.searchParams.append("pagina", pagina);

    fetch(url, {credentials: 'include'}) 
      .then((response) => response.json())
      .then((data) => setLibros(data))
      .catch((error) => console.error("Error al obtener los libros:", error));
  }, [busqueda, pagina]); // <-- Se ejecuta de nuevo si 'busqueda' o 'pagina' cambian []); // El array vacío asegura que se ejecute solo una vez
  const handleAbrirModal = (libro) => {
    setLibroSeleccionado(libro);
    setModalAbierto(true);
  };

  const handleCerrarModal = () => {
    setModalAbierto(false);
    setNumeroDeSocio(""); // Limpiamos el input
  };

  const handleConfirmarPrestamo = async () => {
    if (!numeroDeSocio || !libroSeleccionado) return;

    try {
      const response = await fetch("http://localhost:3001/api/prestamos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          numeroDeSocio: numeroDeSocio,
          libroId: libroSeleccionado.libro_id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.mensaje || "Error al registrar el préstamo");
      }

      // Actualizar la lista de libros en el frontend para reflejar el cambio
      setLibros(
        libros.map((l) =>
          l.libro_id === libroSeleccionado.libro_id
            ? { ...l, estado: "prestado" }
            : l
        )
      );

      setNotificacion({
        abierto: true,
        mensaje: "¡Préstamo registrado con éxito!",
        severidad: "success",
      });
    } catch (error) {
      setNotificacion({
        abierto: true,
        mensaje: error.message,
        severidad: "error",
      });
    } finally {
      handleCerrarModal();
    }
  };
  return (
    <div className={styles.mainBox}>
      <div className={styles.controlsContainer}>
        <TextField
          label="Buscar por título o autor"
          variant="outlined"
          size="small"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          sx={{
            // Estilos para que el borde y la etiqueta cambien de color al hacer foco
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#bf8a3d",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#bf8a3d",
            },
          }}
        />
        <div>
          {/* 3. Reemplazar los <Button> de MUI por <button> de HTML */}
          <button
            onClick={() => setPagina((p) => Math.max(p - 1, 1))}
            disabled={pagina === 1}
            className={tableStyles.paginationButton}
          >
            Anterior
          </button>
          <span className={tableStyles.pageNumber}>Página {pagina}</span>
          <button
            onClick={() => setPagina((p) => p + 1)}
            className={tableStyles.paginationButton}
          >
            Siguiente
          </button>
        </div>
      </div>
      <TableContainer component={Paper} className={styles.catalogoContainer}>
        <Table>
          <TableHead className={tableStyles.tableHeader}>
            <TableRow>
              <TableCell className={tableStyles.tableHeaderCell}>
                <strong>Título</strong>
              </TableCell>
              <TableCell className={tableStyles.tableHeaderCell}>
                <strong>Autor</strong>
              </TableCell>
              <TableCell className={tableStyles.tableHeaderCell}>
                <strong>Estado</strong>
              </TableCell>
              <TableCell className={tableStyles.tableHeaderCell}>
                <strong>Acciones</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(libros) &&
              libros.map((libro, index) => (
                <TableRow
                  key={libro.libro_id}
                  className={`${tableStyles.tableRow} ${
                    index % 2 !== 0 ? tableStyles.tableRowAlternate : ""
                  }`}
                >
                  {/* 1. Estilo para el Título */}
                  <TableCell className={styles.titleText}>
                    {libro.titulo}
                  </TableCell>

                  {/* 2. Estilo para el Autor */}
                  <TableCell className={tableStyles.cellText}>
                    {libro.autor}
                  </TableCell>

                  <TableCell>
                    {/* 3. Estilo refinado para el Chip de Estado */}
                    <Chip
                      label={libro.estado}
                      // Para "disponible", usamos un estilo sutil; para "prestado", uno más fuerte
                      variant={
                        libro.estado === "disponible" ? "outlined" : "filled"
                      }
                      color={
                        libro.estado === "disponible" ? "success" : "error"
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {/* 4. Estilo personalizado para el Botón "Prestar" */}
                    <Button
                      className={tableStyles.actionButton} // Aplicamos la clase unificada
                      size="small"
                      disabled={libro.estado !== "disponible"}
                      onClick={() => handleAbrirModal(libro)}
                    >
                      Prestar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* --- MODAL DE PRÉSTAMO --- */}
      <Dialog open={modalAbierto} onClose={() => setModalAbierto(false)}>
        <DialogTitle>Registrar Préstamo</DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Libro: {libroSeleccionado?.titulo}
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="numeroSocio"
            label="Número de Socio"
            type="text"
            fullWidth
            variant="standard"
            value={numeroDeSocio}
            onChange={(e) => setNumeroDeSocio(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalAbierto(false)}>Cancelar</Button>
          <Button onClick={handleConfirmarPrestamo}>Confirmar Préstamo</Button>
        </DialogActions>
      </Dialog>
      {/* ------------------------- */}
      {/* --- COMPONENTE DE NOTIFICACIÓN --- */}
      <Snackbar
        open={notificacion.abierto}
        autoHideDuration={6000}
        onClose={() => setNotificacion({ ...notificacion, abierto: false })}
      >
        <Alert
          onClose={() => setNotificacion({ ...notificacion, abierto: false })}
          severity={notificacion.severidad}
          sx={{ width: "100%" }}
        >
          {notificacion.mensaje}
        </Alert>
      </Snackbar>
      {/* --------------------------------- */}
    </div>
  );
}
