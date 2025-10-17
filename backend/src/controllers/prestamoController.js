const bibliotecaFacade = require('../facades/bibliotecaFacade');
const prestamoService = require('../services/prestamoService');

const crearPrestamo = async (req, res) => {
  try {
    const { numeroDeSocio, libroId } = req.body;
    // El controlador ahora solo habla con la fachada
    const nuevoPrestamo = await bibliotecaFacade.registrarNuevoPrestamo(numeroDeSocio, libroId);
    res.status(201).json(nuevoPrestamo);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

const getPrestamosVigentes = async (req, res) => {
  try {
    const soloAtrasados = req.query.atrasados === 'true';
    const prestamos = await prestamoService.consultarPrestamosVigentes(soloAtrasados);
    res.json(prestamos);
  } catch (error) {
    // AÑADÍ ESTA LÍNEA
    console.error('Error al obtener préstamos vigentes:', error); 
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

module.exports = {
  crearPrestamo,
  getPrestamosVigentes
};