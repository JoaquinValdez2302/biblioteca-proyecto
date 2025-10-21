// src/strategies/estrategiaMultaPorDeterioro.js
const multaService = require('../services/multaService');

class EstrategiaMultaPorDeterioro {
    async aplicar(prestamo, datosExtra) {
        const { nivelDeDaño, libro } = datosExtra;
        let monto = 0;

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
            throw new Error('Nivel de daño no válido.');
    }

    console.log(`Generando multa de $${monto} para el socio ${prestamo.socio_id} por daño ${nivelDeDaño}.`);
    await multaService.generarMultaPorDeterioro(prestamo.socio_id, libro.titulo, monto);

    return { tipo: 'monetaria', monto: monto };
    }
}

module.exports = new EstrategiaMultaPorDeterioro();