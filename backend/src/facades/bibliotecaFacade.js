const libroService = require('../services/libroService');
const prestamoService = require('../services/prestamoService');
const estadisticasService = require('../services/estadisticasService');

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
// Exportamos un objeto con todos los métodos de la fachada
module.exports = {
    obtenerCatalogoDeLibros,
    registrarNuevoPrestamo,
    obtenerEstadisticasDashboard,
    obtenerPrestamosVencenHoy,
    obtenerUltimasDevoluciones,
};