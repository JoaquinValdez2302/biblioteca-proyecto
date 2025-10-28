
const multaRepository = require('../repositories/multaRepository');

// Genera una multa específica por el deterioro de un libro.
const generarMultaPorDeterioro = (socioId, libroTitulo, monto) => {
    // Construye el motivo de la multa de forma descriptiva.
    const motivo = `Deterioro del libro: ${libroTitulo}`;
    // Delega la creación de la multa al repositorio.
    return multaRepository.crear(socioId, motivo, monto);
};

// Consulta la lista de multas aplicando filtros.
const consultarMultas = (filtroNombre, filtroEstado) => {
    // Delega la obtención de multas al repositorio.
    return multaRepository.obtenerMultas(filtroNombre, filtroEstado);
};

// Registra el pago de una multa, cambiando su estado a 'pagada'.
const registrarPagoDeMulta = (multaId) => {
    // Delega la actualización del estado al repositorio.
    return multaRepository.actualizarEstado(multaId, 'pagada');
};

module.exports = {
    generarMultaPorDeterioro,
    consultarMultas,
    registrarPagoDeMulta,
};