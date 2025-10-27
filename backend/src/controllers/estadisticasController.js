const bibliotecaFacade = require('../facades/bibliotecaFacade');

const getEstadisticas = async (req, res) => {
    try {
    const estadisticas = await bibliotecaFacade.obtenerEstadisticasDashboard();
    res.json(estadisticas);
    } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).send('Error en el servidor');
    }
};

module.exports = {
    getEstadisticas,
}; 