const libroService = require('../services/libroService');
const prestamoService = require('../services/prestamoService');

// La fachada agrupa las operaciones de negocio
const obtenerCatalogoDeLibros = (busqueda, pagina) => {
    return libroService.obtenerTodosLosLibros(busqueda, pagina);
};

const registrarNuevoPrestamo = (numeroDeSocio, libroId) => {
    return prestamoService.realizarPrestamo(numeroDeSocio, libroId);
};

// Exportamos un objeto con todos los métodos de la fachada
module.exports = {
    obtenerCatalogoDeLibros,
    registrarNuevoPrestamo,
};