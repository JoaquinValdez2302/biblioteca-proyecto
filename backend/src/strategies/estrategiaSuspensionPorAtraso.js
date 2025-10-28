
const socioRepository = require('../repositories/socioRepository');

// Implementa el patrón Strategy para la sanción por atraso.
class EstrategiaSuspensionPorAtraso {
    // Aplica la lógica de la suspensión.
    async aplicar(prestamo) {
        const hoy = new Date();
        const vencimiento = new Date(prestamo.fecha_vencimiento);
        const diffTiempo = hoy.getTime() - vencimiento.getTime();
        // Calcula cuántos días han pasado desde la fecha de vencimiento.
        const diasDeAtraso = Math.floor(diffTiempo / (1000 * 3600 * 24));

        // Si no hay atraso, no se aplica ninguna sanción.
        if (diasDeAtraso <= 0) return null;

        // Determina la duración de la suspensión según la cantidad de días de atraso.
        let diasDeSuspension;
        if (diasDeAtraso <= 7) {
            diasDeSuspension = 7;
        } else if (diasDeAtraso <= 15) {
            diasDeSuspension = 15;
        } else {
            diasDeSuspension = 30;
        }

        // Calcula la fecha final de la sanción.
        const fechaSancionHasta = new Date();
        fechaSancionHasta.setDate(fechaSancionHasta.getDate() + diasDeSuspension);

        // Delega la actualización de la sanción del socio al repositorio.
        await socioRepository.actualizarSancion(prestamo.socio_id, fechaSancionHasta);

        // Devuelve un objeto que describe la sanción aplicada.
        return { tipo: 'suspension', dias: diasDeSuspension, hasta: fechaSancionHasta };
    }
}

// Exporta una única instancia de la estrategia (patrón Singleton).
module.exports = new EstrategiaSuspensionPorAtraso();