
const bibliotecaFacade = require('../facades/bibliotecaFacade');

/**
 * Maneja la petición GET /api/reportes/vencen-hoy.
 */
const getVencenHoy = async (req, res) => {
    try {
        // Delega la lógica de negocio a la fachada para obtener los préstamos.
        const prestamos = await bibliotecaFacade.obtenerPrestamosVencenHoy();
        // Envía la lista de préstamos como respuesta JSON.
        res.json(prestamos);
    } catch (error) {
        // Registra el error en la consola para depuración.
        console.error('Error al obtener préstamos que vencen hoy:', error);
        // Envía una respuesta de error genérica al cliente.
        res.status(500).json({ mensaje: 'Error interno del servidor al obtener los préstamos que vencen hoy.' });
    }
};

/**
 * Maneja la petición GET /api/reportes/ultimas-devoluciones.
 * Obtiene una lista de las últimas devoluciones registradas en el sistema..
 */
const getUltimasDevoluciones = async (req, res) => {
    try {
        // Delega la lógica de negocio a la fachada para obtener las devoluciones.
        const devoluciones = await bibliotecaFacade.obtenerUltimasDevoluciones();
        // Envía la lista de devoluciones como respuesta JSON.
        res.json(devoluciones);
    } catch (error) {
        // Registra el error en la consola para depuración.
        console.error('Error al obtener últimas devoluciones:', error);
        // Envía una respuesta de error genérica al cliente.
        res.status(500).json({ mensaje: 'Error interno del servidor al obtener las últimas devoluciones.' });
    }
};

module.exports = {
    getVencenHoy,
    getUltimasDevoluciones,
};