const libroService = require("../services/libroService");
const prestamoService = require("../services/prestamoService");
const estadisticasService = require("../services/estadisticasService");
const multaService = require("../services/multaService");
const socioService = require("../services/socioService");
const usuarioService = require('../services/usuarioService');

// La fachada agrupa las operaciones de negocio
const obtenerCatalogoDeLibros = (busqueda, pagina) => {
  return libroService.obtenerTodosLosLibros(busqueda, pagina);
};

const registrarNuevoPrestamo = (numeroDeSocio, libroId) => {
  return prestamoService.realizarPrestamo(numeroDeSocio, libroId);
};

const obtenerEstadisticasDashboard = () => {
  return estadisticasService.consultarEstadisticas();
};

const obtenerPrestamosVencenHoy = () => {
  return prestamoService.consultarVencenHoy();
};

const obtenerUltimasDevoluciones = () => {
  return prestamoService.consultarUltimasDevoluciones();
};

const procesarDevolucion = (prestamoId, estaDañado, nivelDeDaño) => {
  return prestamoService.procesarDevolucion(
    prestamoId,
    estaDañado,
    nivelDeDaño
  );
};

const consultarMultas = (filtroNombre, filtroEstado) => {
  return multaService.consultarMultas(filtroNombre, filtroEstado);
};

const registrarPagoDeMulta = (multaId) => {
  return multaService.registrarPagoDeMulta(multaId);
};

const obtenerListaDeSocios = (busqueda, pagina) => {
  // Pasa los parámetros y devuelve el objeto completo
  return socioService.consultarTodosLosSocios(busqueda, pagina);
};

const registrarNuevoSocio = (nombreCompleto, dni, email, telefono) => {
  return socioService.registrarNuevoSocio(nombreCompleto, dni, email, telefono);
};

const agregarNuevoLibro = (titulo, autor, isbn, precio) => {
  return libroService.agregarNuevoLibro(titulo, autor, isbn, precio);
};

const obtenerUltimosSociosAgregados = () => {
  return socioService.consultarUltimosSocios();
};

const obtenerUltimosLibrosAgregados = () => {
  return libroService.consultarUltimosLibros();
};


const autenticarUsuario = (nombreUsuario, contraseña) => {
  return usuarioService.autenticarUsuario(nombreUsuario, contraseña);
};
// Exportamos un objeto con todos los métodos de la fachada
module.exports = {
  obtenerCatalogoDeLibros,
  registrarNuevoPrestamo,
  obtenerEstadisticasDashboard,
  obtenerPrestamosVencenHoy,
  obtenerUltimasDevoluciones,
  procesarDevolucion,
  consultarMultas,
  registrarPagoDeMulta,
  registrarNuevoSocio,
  agregarNuevoLibro,
  obtenerListaDeSocios,
  obtenerUltimosSociosAgregados,
  obtenerUltimosLibrosAgregados,
  autenticarUsuario,
};
