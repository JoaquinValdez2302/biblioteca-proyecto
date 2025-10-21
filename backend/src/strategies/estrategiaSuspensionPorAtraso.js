// src/strategies/estrategiaSuspensionPorAtraso.js
const socioRepository = require('../repositories/socioRepository'); // Suponiendo que exista un repo de socio

class EstrategiaSuspensionPorAtraso {
    async aplicar(prestamo) {
    const hoy = new Date();
    const vencimiento = new Date(prestamo.fecha_vencimiento);
    const diffTiempo = hoy.getTime() - vencimiento.getTime();
    const diasDeAtraso = Math.floor(diffTiempo / (1000 * 3600 * 24));

    if (diasDeAtraso <= 0) return null; // No hay sanción si no hay atraso

    let diasDeSuspension;
    if (diasDeAtraso <= 7) {
        diasDeSuspension = 7;
    } else if (diasDeAtraso <= 15) {
        diasDeSuspension = 15;
    } else {
        diasDeSuspension = 30;
    }

    const fechaSancionHasta = new Date();
    fechaSancionHasta.setDate(fechaSancionHasta.getDate() + diasDeSuspension);

    console.log(`Aplicando suspensión al socio ${prestamo.socio_id} por ${diasDeSuspension} días.`);
    // Aquí llamarías a una función del socioRepository para actualizar la fecha de sanción
    await socioRepository.actualizarSancion(prestamo.socio_id, fechaSancionHasta);

    return { tipo: 'suspension', dias: diasDeSuspension, hasta: fechaSancionHasta };
    }
}

module.exports = new EstrategiaSuspensionPorAtraso();