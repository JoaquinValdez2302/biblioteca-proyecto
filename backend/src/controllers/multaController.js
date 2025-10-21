const bibliotecaFacade = require('../facades/bibliotecaFacade');

const getMultas = async (req, res) => {
    try {
    const { nombre, estado } = req.query;
    const multas = await bibliotecaFacade.consultarMultas(nombre, estado);
    res.json(multas);
    } catch (error) {
    // ... (manejo de error)
    }
};

const registrarPago = async (req, res) => {
    try {
    const { id } = req.params;
    const multaPagada = await bibliotecaFacade.registrarPagoDeMulta(id);
    res.json(multaPagada);
    } catch (error) {
    // ... (manejo de error)
    }
};

module.exports = { getMultas, registrarPago };