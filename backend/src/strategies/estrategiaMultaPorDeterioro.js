
const multaService = require('../services/multaService');

// Implementa el patrón Strategy para la sanción por daño.
class EstrategiaMultaPorDeterioro {
    // Aplica la lógica de la multa.
    async aplicar(prestamo, datosExtra) {
        // Extrae los datos necesarios para el cálculo.
        const { nivelDeDaño, libro } = datosExtra;
        let monto = 0;

        // Calcula el monto de la multa según el nivel de daño reportado.
        switch (nivelDeDaño) {
        case 'leve':
            monto = libro.precio * 0.10; // 10% del valor
            break;
        case 'moderado':
            monto = libro.precio * 0.40; // 40% del valor
            break;
        case 'grave':
            monto = libro.precio; // 100% del valor
            break;
        default:
            // Lanza un error si el nivel de daño no es válido.
            throw new Error('Nivel de daño no válido.');
        }

        // Delega la creación de la multa al servicio correspondiente.
        await multaService.generarMultaPorDeterioro(prestamo.socio_id, libro.titulo, monto);

        // Devuelve un objeto que describe la sanción aplicada.
        return { tipo: 'monetaria', monto: monto };
    }
}

// Exporta una única instancia de la estrategia (patrón Singleton).
module.exports = new EstrategiaMultaPorDeterioro();