const multaRepository = require('../repositories/multaRepository');

const generarMultaPorDeterioro = (socioId, libroTitulo, monto) => {
    const motivo = `Deterioro del libro: ${libroTitulo}`;
    return multaRepository.crear(socioId, motivo, monto);
};

// --- NUEVAS FUNCIONES ---
const consultarMultas = (filtroNombre, filtroEstado) => {
    return multaRepository.obtenerMultas(filtroNombre, filtroEstado);
};

const registrarPagoDeMulta = (multaId) => {
    return multaRepository.actualizarEstado(multaId, 'pagada');
};

module.exports = {
    generarMultaPorDeterioro,
    consultarMultas,
    registrarPagoDeMulta,
};