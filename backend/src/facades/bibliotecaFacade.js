
// --- Importación de Servicios ---
const libroService = require("../services/libroService");
const prestamoService = require("../services/prestamoService");
const estadisticasService = require("../services/estadisticasService");
const multaService = require("../services/multaService");
const socioService = require("../services/socioService");
const usuarioService = require('../services/usuarioService');

// --- Definición de Métodos de la Fachada ---

/** Obtiene libros del catálogo con filtros y paginación. */
const obtenerCatalogoDeLibros = (busqueda, pagina) => {
  return libroService.obtenerTodosLosLibros(busqueda, pagina);
};

/** Registra un nuevo préstamo validando disponibilidad y existencia de socio. */
const registrarNuevoPrestamo = (numeroDeSocio, libroId) => {
  return prestamoService.realizarPrestamo(numeroDeSocio, libroId);
};

/** Obtiene las estadísticas principales para el dashboard. */
const obtenerEstadisticasDashboard = () => {
  return estadisticasService.consultarEstadisticas();
};

/** Obtiene los préstamos que vencen en la fecha actual. */
const obtenerPrestamosVencenHoy = () => {
  return prestamoService.consultarVencenHoy();
};

/** Obtiene las últimas devoluciones registradas. */
const obtenerUltimasDevoluciones = () => {
  return prestamoService.consultarUltimasDevoluciones();
};

/** Procesa la devolución de un libro, actualiza estado y aplica sanciones. */
const procesarDevolucion = (prestamoId, estaDañado, nivelDeDaño) => {
  return prestamoService.procesarDevolucion(prestamoId, estaDañado, nivelDeDaño);
};

/** Obtiene una lista de multas con filtros por nombre y estado. */
const consultarMultas = (filtroNombre, filtroEstado) => {
  return multaService.consultarMultas(filtroNombre, filtroEstado);
};

/** Marca una multa como pagada. */
const registrarPagoDeMulta = (multaId) => {
  return multaService.registrarPagoDeMulta(multaId);
};

/** Obtiene la lista de socios con filtros y paginación. */
const obtenerListaDeSocios = (busqueda, pagina) => {
  return socioService.consultarTodosLosSocios(busqueda, pagina);
};

/** Registra un nuevo socio en el sistema. */
const registrarNuevoSocio = (nombreCompleto, dni, email, telefono) => {
  return socioService.registrarNuevoSocio(nombreCompleto, dni, email, telefono);
};

/** Agrega un nuevo libro al catálogo. */
const agregarNuevoLibro = (titulo, autor, isbn, precio) => {
  return libroService.agregarNuevoLibro(titulo, autor, isbn, precio);
};

/** Obtiene los últimos socios agregados. */
const obtenerUltimosSociosAgregados = () => {
  return socioService.consultarUltimosSocios();
};

/** Obtiene los últimos libros agregados. */
const obtenerUltimosLibrosAgregados = () => {
  return libroService.consultarUltimosLibros();
};

/** Autentica un usuario verificando sus credenciales. */
const autenticarUsuario = (nombreUsuario, contraseña) => {
  return usuarioService.autenticarUsuario(nombreUsuario, contraseña); // Corregido: autenticarUsuario
};

// obtiene la lista de prestamos vigentes
consultarPrestamosVigentes = (soloAtrasados) => {
  return prestamoService.consultarPrestamosVigentes(soloAtrasados);
};

// --- Exportación de la Fachada ---
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
  consultarPrestamosVigentes,
};