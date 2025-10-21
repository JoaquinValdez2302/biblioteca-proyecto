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

const registrarDevolucion = async (req, res) => {
  try {
    // 1. Obtenemos el ID del préstamo desde los parámetros de la URL (ej: /api/prestamos/5/devolver)
    const { id } = req.params;
    
    // 2. Obtenemos los datos enviados desde el frontend
    const { estaDañado, nivelDeDaño } = req.body;
    
    // 3. Llamamos a la fachada con los datos (suponiendo que ya la actualizaste)
    // Si no actualizaste la fachada, la llamada sería a: prestamoService.procesarDevolucion(id, estaDañado, nivelDeDaño)
    const resultado = await bibliotecaFacade.procesarDevolucion(id, estaDañado, nivelDeDaño);
    
    res.status(200).json(resultado); // 200: OK
    
  } catch (error) {
    console.error('Error al registrar la devolución:', error);
    res.status(400).json({ mensaje: error.message });
  }
};

module.exports = {
  crearPrestamo,
  getPrestamosVigentes,
  registrarDevolucion,
};