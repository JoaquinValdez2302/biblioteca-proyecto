const estadisticasRepository = require('../repositories/estadisticasRepository');

const consultarEstadisticas = async () => {
    return await estadisticasRepository.obtenerEstadisticasClave();
};

module.exports = {
    consultarEstadisticas,
};