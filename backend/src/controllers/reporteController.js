const bibliotecaFacade = require('../facades/bibliotecaFacade');

const getVencenHoy = async (req, res) => {
    try {
    const prestamos = await bibliotecaFacade.obtenerPrestamosVencenHoy();
    res.json(prestamos);
    } catch (error) {
    console.error('Error al obtener préstamos que vencen hoy:', error);
    res.status(500).send('Error en el servidor');
    }
};

const getUltimasDevoluciones = async (req, res) => {
    try {
    const devoluciones = await bibliotecaFacade.obtenerUltimasDevoluciones();
    res.json(devoluciones);
    } catch (error) {
    console.error('Error al obtener últimas devoluciones:', error);
    res.status(500).send('Error en el servidor');
    }
};

module.exports = {
    getVencenHoy,
    getUltimasDevoluciones,
};